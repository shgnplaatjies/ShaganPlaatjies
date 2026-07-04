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
- `google_dns_managed_zone` for `shaganplaatjies.co.za` - full zone delegation, not just verification records - plus an `A` record pointing the apex domain at the load balancer's static IP.
- A global external HTTPS Application Load Balancer (`load_balancer.tf`) fronting the Cloud Run service via a regional serverless NEG - see "Why a load balancer instead of a domain mapping" below.

## Prerequisites before a real apply

1. A real GCP project ID (currently unset - see `variables.tf`'s `project_id`).
2. At least one image already pushed to Artifact Registry, since `container_image` has no default.
3. A populated `terraform.tfvars` (copy `terraform.tfvars.example`).

Domain ownership does not need a separate Google Search Console verification step: `google_compute_managed_ssl_certificate` uses load-balancer authorization, which Google validates once `google_dns_record_set.app` points the domain at `google_compute_global_address.app.address` (exposed as the `load_balancer_ip` output).

## Why a load balancer instead of a domain mapping

`google_cloud_run_domain_mapping` only provisions in a small fixed set of regions (asia-east1, asia-northeast1, asia-southeast1, europe-north1, europe-west1, europe-west4, us-central1, us-east1, us-east4, us-west1 as of this writing), and Google documents it as not production-ready even in those regions. `africa-south1` - this module's region, chosen for locality to shaganplaatjies.co.za's audience - is not on that list, so a domain mapping would fail at apply time regardless of any apply-ordering workaround. A global external HTTPS load balancer with a regional serverless NEG backend is Google's documented replacement: the NEG must live in the same region as the Cloud Run service (satisfied here, since both use `var.region`), but the load balancer itself is global and region-unrestricted. This also removes the two-pass apply that a domain mapping's DNS records would have needed: the load balancer's IP is a plain resource attribute rather than a `for_each` key, so `google_dns_record_set.app` resolves in a single `terraform apply`.

## Validating without touching any real backend

No backend is configured (state stays local, and nothing here should ever be applied from this repo without the captain's real project ID and credentials in hand). `terraform init` only needs to download the `google` provider plugin from the public registry - no GCP authentication required for that:

```sh
terraform init
terraform validate
```

Do not run `terraform plan` or `terraform apply` without a real `project_id` and authenticated credentials - and even then, only the captain runs those, not this phase.
