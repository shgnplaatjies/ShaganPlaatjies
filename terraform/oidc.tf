# Separate from the app's own runtime identity (identity.tf) - this one is
# assumed by deploy-azure-container-apps.yml via OIDC (no client secret) to
# build/push images and update the Container App.
resource "azurerm_user_assigned_identity" "deploy" {
  name                = "${var.app_name}-deploy"
  resource_group_name = azurerm_resource_group.app.name
  location            = azurerm_resource_group.app.location
}

# One federated credential per branch (var.github_branches) - each subject
# claim trusts only workflow runs triggered from that exact branch ref in
# this exact repo.
resource "azurerm_federated_identity_credential" "deploy" {
  for_each = toset(var.github_branches)

  name                      = "github-actions-${each.value}"
  audience                  = ["api://AzureADTokenExchange"]
  issuer                    = "https://token.actions.githubusercontent.com"
  subject                   = "repo:${var.github_repository}:ref:refs/heads/${each.value}"
  user_assigned_identity_id = azurerm_user_assigned_identity.deploy.id
}

resource "azurerm_role_assignment" "deploy_acr_push" {
  scope                = azurerm_container_registry.app.id
  role_definition_name = "AcrPush"
  principal_id         = azurerm_user_assigned_identity.deploy.principal_id
}

# Lets the workflow run `az containerapp update --image ...` to roll out
# newly-pushed images without granting broader resource-group access.
resource "azurerm_role_assignment" "deploy_container_apps_contributor" {
  scope                = azurerm_resource_group.app.id
  role_definition_name = "Container Apps Contributor"
  principal_id         = azurerm_user_assigned_identity.deploy.principal_id
}
