# Terraform: Azure Container Apps deployment

Root module for running ShaganPlaatjies on Azure Container Apps instead of cPanel.

This is Phase 1 of the migration: reviewable infrastructure code only.
Nothing here has been applied against a real Azure subscription - no subscription ID, tenant ID, or credentials exist for this yet.
`deploy-to-cpanel.yml` keeps running the live site until a later phase explicitly cuts DNS over.

The target was originally GCP Cloud Run; the captain switched it to Azure Container Apps for career/market skill transferability reasons after a follow-up investigation found the two tied on technical fit and cost for this workload.

## What this creates

- `azurerm_container_registry` (Basic SKU) - stores the app's container images.
- `azurerm_log_analytics_workspace` + `azurerm_container_app_environment` - the Container Apps hosting environment.
- `azurerm_container_app` - runs the container, `min_replicas = 0` (true scale-to-zero; cold starts are acceptable for this low-traffic site).
- A dedicated `azurerm_user_assigned_identity` for the Container App's runtime (image pull + Key Vault secret access - not the registry's admin credentials).
- `azurerm_key_vault` (RBAC-authorized) + `azurerm_key_vault_secret` for `RESEND_API_KEY`, referenced by the Container App via a Key-Vault-backed `secret` block rather than a plaintext env var. Terraform manages the secret container only - its value is a placeholder, ignored after creation (see `key_vault.tf`).
- `azurerm_dns_zone` for `shaganplaatjies.co.za` - full zone delegation, not just verification records - plus the TXT verification record and CNAME the custom domain binding requires.
- `azurerm_container_app_custom_domain` with a Container-Apps-managed, auto-renewing certificate.
- A second, separate `azurerm_user_assigned_identity` plus one `azurerm_federated_identity_credential` per branch in `var.github_branches` (default `["main", "stg"]`, mirroring `deploy-to-cpanel.yml`'s branch split) for GitHub Actions OIDC - no client secret ever stored in GitHub.

## Prerequisites before a real apply

1. A real Azure subscription ID and tenant ID (currently unset - see `variables.tf`'s `subscription_id`/`tenant_id`).
2. At least one image already pushed to the Container Registry, since `container_image` has no default.
3. A populated `terraform.tfvars` (copy `terraform.tfvars.example`).
4. Whoever runs `terraform apply` needs enough Azure AD/RBAC privilege to create role assignments and app registrations-equivalent objects (user-assigned identities, federated credentials) - typically Owner or User Access Administrator + Application Administrator at the subscription/tenant level.

## The apex domain's CNAME is not a real solution yet

`dns.tf`'s `azurerm_dns_cname_record.app` points the zone apex at the Container App's default FQDN, but a literal CNAME at a zone apex is not DNS-compliant (it would coexist with the zone's own NS/SOA records) and most DNS servers, including Azure DNS, reject it in practice. This needs to be resolved before a real apply - most likely by fronting the Container App with Azure Front Door or Traffic Manager (Azure DNS can alias those at the apex) or by serving the site from `www.shaganplaatjies.co.za` and redirecting the apex. The prior GCP module didn't have this problem because Cloud Run's global load balancer exposed a plain, A-record-able static IP. Flagged here rather than silently guessed at.

## Validating without touching any real backend

No backend is configured (state stays local, and nothing here should ever be applied from this repo without the captain's real subscription ID, tenant ID, and credentials in hand). `terraform init` only needs to download the `azurerm`/`azuread` provider plugins from the public registry - no Azure authentication required for that:

```sh
terraform init
terraform validate
```

Do not run `terraform plan` or `terraform apply` without real credentials - and even then, only the captain runs those, not this phase.
