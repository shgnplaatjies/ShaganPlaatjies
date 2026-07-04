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
- `azurerm_dns_zone` for `shaganplaatjies.co.za` - full zone delegation, not just verification records. **Gated behind `var.enable_custom_domain` (default `false`) - see "Two-phase apply" below.**
- `azurerm_cdn_frontdoor_profile`/`_endpoint`/`_origin_group`/`_origin`/`_route` (Azure Front Door Standard) fronting the Container App, plus `azurerm_cdn_frontdoor_custom_domain` (+ `_custom_domain_association`) binding `shaganplaatjies.co.za` to it with a Front-Door-managed, auto-renewing certificate. TLS and the custom domain terminate at Front Door, not the Container App - see "Apex domain: fronted by Azure Front Door" below. **Also gated behind `var.enable_custom_domain`.**
- `azurerm_dns_a_record` aliasing the zone apex directly at the Front Door endpoint, plus the `azurerm_dns_txt_record` Front Door's custom-domain validation needs. **Also gated behind `var.enable_custom_domain`.**
- A second, separate `azurerm_user_assigned_identity` plus one `azurerm_federated_identity_credential` per branch in `var.github_branches` (default `["main", "stg"]`, mirroring `deploy-to-cpanel.yml`'s branch split) for GitHub Actions OIDC - no client secret ever stored in GitHub.

## Prerequisites before a real apply

1. A real Azure subscription ID and tenant ID (currently unset - see `variables.tf`'s `subscription_id`/`tenant_id`).
2. At least one image already pushed to the Container Registry, since `container_image` has no default.
3. A populated `terraform.tfvars` (copy `terraform.tfvars.example`).
4. Whoever runs `terraform apply` needs enough Azure AD/RBAC privilege to create role assignments and app registrations-equivalent objects (user-assigned identities, federated credentials) - typically Owner or User Access Administrator + Application Administrator at the subscription/tenant level.

## Two-phase apply: `enable_custom_domain`

The captain doesn't currently have registrar access for `shaganplaatjies.co.za` (it's mid-transfer away from cPanel hosting), so this module applies in two phases rather than all at once:

- **Phase 1** (`enable_custom_domain = false`, the default): creates only the core app infra - resource group, registry, log analytics workspace, Container App environment + Container App (reachable via its own default `*.azurecontainerapps.io` FQDN and automatic HTTPS, see `container_app_default_fqdn` in `outputs.tf`), the two user-assigned identities, and Key Vault. Nothing touches DNS or Front Door, so nothing needs registrar access.
- **Phase 2** (`enable_custom_domain = true`): once DNS delegation access for `shaganplaatjies.co.za` exists again, additionally creates the `azurerm_dns_zone`, the apex DNS records, and every Front Door resource in `frontdoor.tf` - see "Apex domain: fronted by Azure Front Door" below for what that phase creates.

`dns_zone_name_servers` and `frontdoor_endpoint_host_name` (`outputs.tf`) are `null` until phase 2 runs. Note `locals.tf`'s `allowed_origin` still defaults to `https://shaganplaatjies.co.za` regardless of phase - during phase 1 the app is actually reachable at its default FQDN, not that origin, which is expected until phase 2 cuts the domain over.

## Apex domain: fronted by Azure Front Door

A literal CNAME at a zone apex is not DNS-compliant (it would coexist with the zone's own NS/SOA records) and most DNS servers, including Azure DNS, reject it in practice - the prior GCP module didn't have this problem because Cloud Run's global load balancer exposed a plain, A-record-able static IP.

This is resolved by fronting the Container App with Azure Front Door (Standard) and aliasing the apex at it instead of naming it via CNAME:

- `frontdoor.tf` creates the Front Door profile, endpoint, origin group/origin (pointing at the Container App's default FQDN), and route, plus a custom domain (with a Front-Door-managed certificate) for `shaganplaatjies.co.za`.
- `dns.tf`'s `azurerm_dns_a_record.app` uses Azure DNS's alias-record feature - `target_resource_id` pointing at the Front Door endpoint - which is the standard Azure pattern for apex-aliasing to a PaaS frontend and sidesteps the CNAME-at-apex restriction entirely.
- The Container App no longer binds its own custom domain or certificate (compare `container_app.tf`'s ingress block, which only exposes the default `*.azurecontainerapps.io` FQDN); Front Door is the sole TLS/custom-domain termination point, and it forwards to the Container App's default FQDN as its origin.
- `dns.tf`'s `azurerm_dns_txt_record.frontdoor_domain_validation` (`_dnsauth.shaganplaatjies.co.za`) satisfies Front Door's custom-domain ownership check before it will issue the managed certificate.

## Validating without touching any real backend

No backend is configured (state stays local, and nothing here should ever be applied from this repo without the captain's real subscription ID, tenant ID, and credentials in hand). `terraform init` only needs to download the `azurerm`/`azuread` provider plugins from the public registry - no Azure authentication required for that:

```sh
terraform init
terraform validate
```

Do not run `terraform plan` or `terraform apply` without real credentials - and even then, only the captain runs those, not this phase.
