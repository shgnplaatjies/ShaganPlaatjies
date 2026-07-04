# Full zone delegation for shaganplaatjies.co.za, not just ownership
# verification records - point the registrar's name servers at
# dns_zone_name_servers (see outputs.tf) to complete the cutover.
resource "azurerm_dns_zone" "primary" {
  name                = var.domain_name
  resource_group_name = azurerm_resource_group.app.name
}

# Azure Container Apps custom-domain verification: a TXT record at
# asuid.<domain> containing the environment's custom domain verification
# ID, checked before a managed certificate can be issued.
resource "azurerm_dns_txt_record" "domain_verification" {
  name                = "asuid"
  zone_name           = azurerm_dns_zone.primary.name
  resource_group_name = azurerm_resource_group.app.name
  ttl                 = 300

  record {
    value = azurerm_container_app_environment.app.custom_domain_verification_id
  }
}

# CNAME at the apex is not strictly DNS-compliant (RFC 1034 forbids other
# records coexisting at a name with a CNAME, and the zone's own NS/SOA
# records already occupy the apex) - most registrars and Azure DNS itself
# reject a literal CNAME here. This is flagged for the captain to resolve
# before a real apply, likely by fronting the apex with Azure Front
# Door/Traffic Manager (which Azure DNS can alias at the apex) or by
# serving the site from a "www" subdomain and redirecting the apex,
# mirroring the same apex-CNAME constraint the prior GCP module's
# domain-mapping approach did not have to deal with (Cloud Run's global
# load balancer exposes a plain A-record-able static IP instead).
resource "azurerm_dns_cname_record" "app" {
  name                = "@"
  zone_name           = azurerm_dns_zone.primary.name
  resource_group_name = azurerm_resource_group.app.name
  ttl                 = 300
  record              = azurerm_container_app.app.ingress[0].fqdn

  depends_on = [azurerm_dns_txt_record.domain_verification]
}

resource "azurerm_container_app_custom_domain" "app" {
  name                     = var.domain_name
  container_app_id         = azurerm_container_app.app.id
  certificate_binding_type = "SniEnabled"

  depends_on = [
    azurerm_dns_txt_record.domain_verification,
    azurerm_dns_cname_record.app,
  ]

  lifecycle {
    # Azure issues and binds the managed certificate itself once DNS
    # verification succeeds; nothing here should force a cert replacement.
    create_before_destroy = true
  }
}
