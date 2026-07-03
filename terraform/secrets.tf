# The secret container and IAM binding are managed here; the secret *value*
# is deliberately not. Populate it out-of-band once the secret exists, e.g.:
#   gcloud secrets versions add "${resend_api_key_secret_id}" --data-file=-
# Keeping the value out of a `google_secret_manager_secret_version` resource
# means it never enters Terraform state or this repo's history.
resource "google_secret_manager_secret" "resend_api_key" {
  secret_id = var.resend_api_key_secret_id

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_iam_member" "resend_api_key_accessor" {
  secret_id = google_secret_manager_secret.resend_api_key.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run.email}"
}
