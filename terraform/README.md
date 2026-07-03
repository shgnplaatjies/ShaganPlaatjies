# Terraform: GCP Cloud Run deployment

Root module for running ShaganPlaatjies on GCP Cloud Run instead of cPanel.

This is Phase 1 of the migration: reviewable infrastructure code only.
Nothing here has been applied against a real GCP project - no project ID or credentials exist for this yet.
`deploy-to-cpanel.yml` keeps running the live site until a later phase explicitly cuts DNS over.

## What this creates

- `google_artifact_registry_repository` - stores the app's container images.
- `google_cloud_run_v2_service` - runs the container, `min_instance_count = 0` (true scale-to-zero; cold starts are acceptable for this low-traffic site).
- A dedicated `google_service_account` for the Cloud Run service (not the default compute service account).
- `google_secret_manager_secret` for `RESEND_API_KEY`, with an IAM binding granting the Cloud Run service account `roles/secretmanager.secretAccessor`. Terraform manages the secret container and binding only - the value is populated out-of-band (see `secrets.tf`) so it never enters Terraform state.
- `google_dns_managed_zone` for `shaganplaatjies.co.za` - full zone delegation, not just verification records - plus the Cloud Run domain mapping and the DNS records it requires.

## Prerequisites before a real apply

1. A real GCP project ID (currently unset - see `variables.tf`'s `project_id`).
2. The domain verified for that project via [Google Search Console](https://search.google.com/search-console) - a one-time manual step Terraform cannot automate, required before `google_cloud_run_domain_mapping` will succeed.
3. At least one image already pushed to Artifact Registry, since `container_image` has no default.
4. A populated `terraform.tfvars` (copy `terraform.tfvars.example`).

## The domain mapping needs two applies

`google_cloud_run_domain_mapping.app`'s DNS records (`status[0].resource_records`) are only known once Google has actually created the mapping - so on a from-scratch apply, the `for_each` in `dns.tf` that creates those records can't resolve its keys during planning. Apply in two passes:

```sh
terraform apply -target=google_cloud_run_domain_mapping.app
terraform apply
```

The first pass creates the mapping and populates its status; the second creates the DNS records from that now-known status.

## Validating without touching any real backend

No backend is configured (state stays local, and nothing here should ever be applied from this repo without the captain's real project ID and credentials in hand). `terraform init` only needs to download the `google` provider plugin from the public registry - no GCP authentication required for that:

```sh
terraform init
terraform validate
```

Do not run `terraform plan` or `terraform apply` without a real `project_id` and authenticated credentials - and even then, only the captain runs those, not this phase.
