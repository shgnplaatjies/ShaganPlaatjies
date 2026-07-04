# Dedicated runtime identity for the Container App - not the ACR admin
# credentials, and not a second, separately-provisioned identity per
# concern. Used both to pull the image from Azure Container Registry and to
# read RESEND_API_KEY from Key Vault (see container_app.tf, key_vault.tf).
# A user-assigned identity (rather than the container app's system-assigned
# one) lets the AcrPull/Key-Vault-Secrets-User role assignments below be
# created - and take effect - before the Container App resource that
# references them, avoiding a create-time chicken-and-egg pull failure.
resource "azurerm_user_assigned_identity" "app" {
  name                = "${var.app_name}-app"
  resource_group_name = azurerm_resource_group.app.name
  location            = azurerm_resource_group.app.location
}

resource "azurerm_role_assignment" "app_acr_pull" {
  scope                = azurerm_container_registry.app.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_user_assigned_identity.app.principal_id
}
