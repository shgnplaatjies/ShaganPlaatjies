# Required by azurerm_container_app_environment for its system logs; a
# short retention keeps this near-free for a low-traffic personal site.
resource "azurerm_log_analytics_workspace" "app" {
  name                = "${var.app_name}-logs"
  resource_group_name = azurerm_resource_group.app.name
  location            = azurerm_resource_group.app.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_container_app_environment" "app" {
  name                       = "${var.app_name}-env"
  resource_group_name        = azurerm_resource_group.app.name
  location                   = azurerm_resource_group.app.location
  log_analytics_workspace_id = azurerm_log_analytics_workspace.app.id
}

resource "azurerm_container_app" "app" {
  name                         = var.app_name
  resource_group_name          = azurerm_resource_group.app.name
  container_app_environment_id = azurerm_container_app_environment.app.id
  revision_mode                = "Single"

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.app.id]
  }

  registry {
    server   = azurerm_container_registry.app.login_server
    identity = azurerm_user_assigned_identity.app.id
  }

  secret {
    name                = "resend-api-key"
    identity            = azurerm_user_assigned_identity.app.id
    key_vault_secret_id = azurerm_key_vault_secret.resend_api_key.versionless_id
  }

  template {
    min_replicas = var.min_replicas
    max_replicas = var.max_replicas

    container {
      name   = var.app_name
      image  = var.container_image
      cpu    = var.container_cpu
      memory = var.container_memory

      # NODE_ENV/APP_PORT: server.js serves plain HTTP on APP_PORT only
      # when NODE_ENV=production (see server.js). 8080 must match the
      # ingress target_port below - Container Apps has no injected PORT
      # env var the way Cloud Run does, so this is the only place the
      # listening port is configured.
      env {
        name  = "NODE_ENV"
        value = "production"
      }

      env {
        name  = "APP_PORT"
        value = "8080"
      }

      env {
        name  = "ALLOWED_ORIGIN"
        value = local.allowed_origin
      }

      env {
        name  = "WP_DOMAIN"
        value = var.wp_domain
      }

      env {
        name  = "WP_JSON_API_URI"
        value = var.wp_json_api_uri
      }

      env {
        name  = "WP_POSTS_URI"
        value = var.wp_posts_uri
      }

      env {
        name        = "RESEND_API_KEY"
        secret_name = "resend-api-key"
      }
    }
  }

  ingress {
    external_enabled = true
    target_port      = 8080

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  depends_on = [
    azurerm_role_assignment.app_acr_pull,
    azurerm_role_assignment.app_secrets_user,
  ]
}
