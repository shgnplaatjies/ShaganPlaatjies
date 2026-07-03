resource "google_cloud_run_v2_service" "app" {
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = google_service_account.cloud_run.email

    scaling {
      min_instance_count = var.min_instance_count
      max_instance_count = var.max_instance_count
    }

    containers {
      image = var.container_image

      ports {
        container_port = 8080
      }

      resources {
        limits = {
          cpu    = var.container_cpu
          memory = var.container_memory
        }
      }

      # NODE_ENV/APP_PORT: server.js serves plain HTTP on APP_PORT only when
      # NODE_ENV=production (see server.js). 8080 must match the
      # container_port above and the port Cloud Run's own PORT env var
      # injects by default.
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
        name = "RESEND_API_KEY"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.resend_api_key.secret_id
            version = "latest"
          }
        }
      }
    }
  }

  depends_on = [google_secret_manager_secret_iam_member.resend_api_key_accessor]
}

# Public site: anyone can invoke the service directly (in addition to
# whatever traffic arrives via the custom domain mapping in dns.tf).
resource "google_cloud_run_v2_service_iam_member" "public_invoker" {
  name     = google_cloud_run_v2_service.app.name
  location = google_cloud_run_v2_service.app.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
