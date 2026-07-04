resource "azurerm_container_registry" "app" {
  name                = var.container_registry_name
  resource_group_name = azurerm_resource_group.app.name
  location            = azurerm_resource_group.app.location
  sku                 = "Basic"
  admin_enabled       = false
}
