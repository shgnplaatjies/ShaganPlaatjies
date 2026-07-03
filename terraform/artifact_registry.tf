resource "google_artifact_registry_repository" "app" {
  location      = var.region
  repository_id = var.artifact_repository_id
  description   = "Container images for the ${var.service_name} Cloud Run service."
  format        = "DOCKER"
}
