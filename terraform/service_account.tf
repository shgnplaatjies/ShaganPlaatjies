resource "google_service_account" "cloud_run" {
  account_id   = "${var.service_name}-run"
  display_name = "Cloud Run runtime identity for ${var.service_name}"
  description  = "Dedicated least-privilege service account the Cloud Run service runs as - not the default compute service account."
}
