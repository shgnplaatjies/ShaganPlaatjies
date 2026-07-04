output "cloud_run_service_url" {
  description = "The default *.run.app URL for the Cloud Run service."
  value       = google_cloud_run_v2_service.app.uri
}

output "artifact_registry_repository" {
  description = "Fully-qualified Artifact Registry repository path to push images to."
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.app.repository_id}"
}

output "cloud_run_service_account_email" {
  description = "Email of the dedicated Cloud Run runtime service account, for use in the deploy workflow's OIDC IAM bindings."
  value       = google_service_account.cloud_run.email
}

output "dns_managed_zone_name_servers" {
  description = "Name servers to configure at the domain registrar to delegate shaganplaatjies.co.za to this Cloud DNS zone."
  value       = google_dns_managed_zone.primary.name_servers
}

output "load_balancer_ip" {
  description = "Static IP address of the global external HTTPS load balancer that fronts the Cloud Run service. google_dns_record_set.app points the apex domain at this address."
  value       = google_compute_global_address.app.address
}

output "resend_api_key_secret_id" {
  description = "Secret Manager secret ID to populate out-of-band, e.g.: gcloud secrets versions add <this value> --data-file=-"
  value       = google_secret_manager_secret.resend_api_key.secret_id
}
