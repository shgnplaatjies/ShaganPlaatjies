terraform {
  required_version = ">= 1.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  # Intentionally no backend block. This phase ships local-state Terraform
  # for review only - nothing here has been applied against a real GCP
  # project. Configure a remote (GCS) backend once a project exists and the
  # captain decides on a state bucket.
}

provider "google" {
  project = var.project_id
  region  = var.region
}
