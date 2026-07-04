data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "app" {
  name                       = "${var.app_name}-kv"
  resource_group_name        = azurerm_resource_group.app.name
  location                   = azurerm_resource_group.app.location
  tenant_id                  = var.tenant_id
  sku_name                   = "standard"
  rbac_authorization_enabled = true
}

resource "azurerm_role_assignment" "app_secrets_user" {
  scope                = azurerm_key_vault.app.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_user_assigned_identity.app.principal_id
}

# RBAC-authorized vaults grant nobody access by default, including whoever
# runs `terraform apply` - without this, Terraform itself couldn't create
# the secret container below.
resource "azurerm_role_assignment" "deployer_secrets_officer" {
  scope                = azurerm_key_vault.app.id
  role_definition_name = "Key Vault Secrets Officer"
  principal_id         = data.azurerm_client_config.current.object_id
}

# The secret container is managed here; its *value* deliberately is not.
# Terraform creates it with a placeholder so the resource can exist before
# any value is populated, then ignores further changes to that value -
# populate the real value out-of-band, e.g.:
#   az keyvault secret set --vault-name <key_vault_name> --name <this name> --value ...
# so the real key never enters Terraform state or this repo's history.
resource "azurerm_key_vault_secret" "resend_api_key" {
  name         = var.resend_api_key_secret_name
  value        = "placeholder-populate-out-of-band"
  key_vault_id = azurerm_key_vault.app.id

  depends_on = [azurerm_role_assignment.deployer_secrets_officer]

  lifecycle {
    ignore_changes = [value]
  }
}
