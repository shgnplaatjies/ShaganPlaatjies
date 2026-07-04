# Fronts the Container App with Azure Front Door (Standard) so TLS and the
# shaganplaatjies.co.za custom domain terminate here instead of on the
# Container App directly - Azure DNS can alias the zone apex straight at a
# Front Door endpoint (see dns.tf's azurerm_dns_a_record.app), which a
# literal CNAME at the apex cannot do. See README.md for the full rationale.
#
# Every resource here is gated behind enable_custom_domain (default false,
# see variables.tf and dns.tf) - the first apply stands up only the core app
# infra, reachable via the Container App's own default FQDN, since the
# captain doesn't currently have registrar access for domain_name.
resource "azurerm_cdn_frontdoor_profile" "app" {
  count               = var.enable_custom_domain ? 1 : 0
  name                = "${var.app_name}-fd"
  resource_group_name = azurerm_resource_group.app.name
  sku_name            = "Standard_AzureFrontDoor"
}

resource "azurerm_cdn_frontdoor_endpoint" "app" {
  count                    = var.enable_custom_domain ? 1 : 0
  name                     = var.app_name
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.app[0].id
}

resource "azurerm_cdn_frontdoor_origin_group" "app" {
  count                    = var.enable_custom_domain ? 1 : 0
  name                     = "${var.app_name}-origin-group"
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.app[0].id

  load_balancing {
    sample_size                 = 4
    successful_samples_required = 3
  }
}

# The Container App's own *.azurecontainerapps.io FQDN, reached over HTTPS
# via its Azure-managed certificate. The Container App itself binds no
# custom domain (see container_app.tf's ingress block) - Front Door is the
# only thing that terminates the shaganplaatjies.co.za custom domain.
resource "azurerm_cdn_frontdoor_origin" "app" {
  count                          = var.enable_custom_domain ? 1 : 0
  name                           = "${var.app_name}-origin"
  cdn_frontdoor_origin_group_id  = azurerm_cdn_frontdoor_origin_group.app[0].id
  enabled                        = true
  host_name                      = azurerm_container_app.app.ingress[0].fqdn
  origin_host_header             = azurerm_container_app.app.ingress[0].fqdn
  http_port                      = 80
  https_port                     = 443
  certificate_name_check_enabled = true
}

# Managed TLS certificate for the apex domain, validated via the _dnsauth
# TXT record in dns.tf. dns_zone_id ties this to the Azure-DNS-hosted zone
# so Front Door can find it for validation.
resource "azurerm_cdn_frontdoor_custom_domain" "app" {
  count                    = var.enable_custom_domain ? 1 : 0
  name                     = replace(var.domain_name, ".", "-")
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.app[0].id
  dns_zone_id              = azurerm_dns_zone.primary[0].id
  host_name                = var.domain_name

  tls {
    certificate_type = "ManagedCertificate"
    minimum_version  = "TLS12"
  }
}

resource "azurerm_cdn_frontdoor_route" "app" {
  count                           = var.enable_custom_domain ? 1 : 0
  name                            = "${var.app_name}-route"
  cdn_frontdoor_endpoint_id       = azurerm_cdn_frontdoor_endpoint.app[0].id
  cdn_frontdoor_origin_group_id   = azurerm_cdn_frontdoor_origin_group.app[0].id
  cdn_frontdoor_origin_ids        = [azurerm_cdn_frontdoor_origin.app[0].id]
  cdn_frontdoor_custom_domain_ids = [azurerm_cdn_frontdoor_custom_domain.app[0].id]
  link_to_default_domain          = false

  supported_protocols    = ["Http", "Https"]
  patterns_to_match      = ["/*"]
  forwarding_protocol    = "HttpsOnly"
  https_redirect_enabled = true
}

# Kept alongside the route's own cdn_frontdoor_custom_domain_ids: HashiCorp's
# reference examples pair both to avoid a race where the route activates
# before the custom domain's managed certificate has finished provisioning.
resource "azurerm_cdn_frontdoor_custom_domain_association" "app" {
  count                          = var.enable_custom_domain ? 1 : 0
  cdn_frontdoor_custom_domain_id = azurerm_cdn_frontdoor_custom_domain.app[0].id
  cdn_frontdoor_route_ids        = [azurerm_cdn_frontdoor_route.app[0].id]
}
