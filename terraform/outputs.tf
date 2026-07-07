output "container_app_default_fqdn" {
  description = "The default *.azurecontainerapps.io FQDN for the Container App."
  value       = azurerm_container_app.app.ingress[0].fqdn
}

output "container_registry_login_server" {
  description = "Login server (registry host) to push images to, e.g. for `docker push <this value>/<image>:<tag>`."
  value       = azurerm_container_registry.app.login_server
}

output "dns_zone_name_servers" {
  description = "Name servers to configure at the domain registrar to delegate shaganplaatjies.co.za to this Azure DNS zone. Null until enable_custom_domain = true (see variables.tf)."
  value       = var.enable_custom_domain ? azurerm_dns_zone.primary[0].name_servers : null
}

output "resend_api_key_secret_name" {
  description = "Key Vault secret name to populate out-of-band, e.g.: az keyvault secret set --vault-name <key_vault_name> --name <this value> --value ..."
  value       = azurerm_key_vault_secret.resend_api_key.name
}

output "key_vault_name" {
  description = "Key Vault name, for use with the az keyvault secret set command referenced above."
  value       = azurerm_key_vault.app.name
}

output "deploy_identity_client_id" {
  description = "Client ID of the user-assigned identity that deploy-azure-container-apps.yml authenticates as via OIDC (azure/login's client-id input)."
  value       = azurerm_user_assigned_identity.deploy.client_id
}

output "frontdoor_endpoint_host_name" {
  description = "Default *.azurefd.net host name of the Front Door endpoint fronting the Container App - useful for testing the route before the apex DNS alias/certificate finish provisioning. Null until enable_custom_domain = true (see variables.tf)."
  value       = var.enable_custom_domain ? azurerm_cdn_frontdoor_endpoint.app[0].host_name : null
}
