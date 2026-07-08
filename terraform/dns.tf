# Full zone delegation for shaganplaatjies.co.za, not just ownership
# verification records - point the registrar's name servers at
# dns_zone_name_servers (see outputs.tf) to complete the cutover.
#
# TODO: apply with enable_custom_domain=true once registrar/DNS delegation
# access for domain_name is available.
resource "azurerm_dns_zone" "primary" {
  count               = var.enable_custom_domain ? 1 : 0
  name                = var.domain_name
  resource_group_name = azurerm_resource_group.app.name
}

# Azure Front Door custom-domain validation: a TXT record at
# _dnsauth.<domain> containing the domain's validation token, checked before
# Front Door's managed certificate can be issued (see frontdoor.tf).
resource "azurerm_dns_txt_record" "frontdoor_domain_validation" {
  count               = var.enable_custom_domain ? 1 : 0
  name                = "_dnsauth"
  zone_name           = azurerm_dns_zone.primary[0].name
  resource_group_name = azurerm_resource_group.app.name
  ttl                 = 300

  record {
    value = azurerm_cdn_frontdoor_custom_domain.app[0].validation_token
  }
}

# A literal CNAME at the zone apex is not DNS-compliant (RFC 1034 forbids
# other records coexisting at a name with a CNAME, and the zone's own NS/SOA
# records already occupy the apex) - most registrars and Azure DNS itself
# reject it. Azure DNS's alias-record feature sidesteps this entirely: an
# "A" record can alias the apex directly at an Azure resource (here, the
# Front Door endpoint in frontdoor.tf) instead of naming a hostname via
# CNAME. See README.md's "Apex domain: fronted by Azure Front Door" section.
resource "azurerm_dns_a_record" "app" {
  count               = var.enable_custom_domain ? 1 : 0
  name                = "@"
  zone_name           = azurerm_dns_zone.primary[0].name
  resource_group_name = azurerm_resource_group.app.name
  ttl                 = 300
  target_resource_id  = azurerm_cdn_frontdoor_endpoint.app[0].id

  depends_on = [azurerm_dns_txt_record.frontdoor_domain_validation]
}
