variable "subscription_id" {
  description = "Azure subscription ID that hosts every resource in this module. No default - must be supplied once a real subscription exists."
  type        = string
}

variable "tenant_id" {
  description = "Azure AD tenant ID that owns the subscription and the GitHub Actions OIDC federated identity. No default - must be supplied once a real tenant exists."
  type        = string
}

variable "location" {
  description = "Azure region for every resource in this module. South Africa North is closest to shaganplaatjies.co.za's audience."
  type        = string
  default     = "South Africa North"
}

variable "resource_group_name" {
  description = "Name of the resource group that holds every resource in this module."
  type        = string
  default     = "shaganplaatjies"
}

variable "domain_name" {
  description = "Apex domain served by this deployment. The Azure DNS zone created here takes full delegation for it, not just verification records."
  type        = string
  default     = "shaganplaatjies.co.za"
}

variable "enable_custom_domain" {
  description = "Whether to create the DNS zone, apex DNS records, and Front Door custom-domain resources for domain_name. False for the first apply, which stands up the app reachable only via the Container App's own default FQDN (no registrar access needed) - flip to true for a later apply once DNS delegation access for domain_name exists again."
  type        = bool
  default     = false
}

variable "app_name" {
  description = "Name of the Container App and the prefix used for related resource names."
  type        = string
  default     = "shaganplaatjies"
}

variable "container_registry_name" {
  description = "Name of the Azure Container Registry that stores the app's container images. Must be globally unique and alphanumeric only (no hyphens)."
  type        = string
  default     = "shaganplaatjies"
}

variable "container_image" {
  description = "Fully-qualified image reference to deploy, e.g. \"shaganplaatjies.azurecr.io/shaganplaatjies:<tag>\". Supplied by the deploy workflow after it pushes a new image - no default, since no image exists until the first build."
  type        = string
}

variable "min_replicas" {
  description = "Minimum Container App replica count. 0 gives true scale-to-zero; cold starts are acceptable for this low-traffic site."
  type        = number
  default     = 0
}

variable "max_replicas" {
  description = "Maximum Container App replica count."
  type        = number
  default     = 2
}

variable "container_cpu" {
  description = "vCPU allocation for the Container App (must be a value from Azure Container Apps' supported cpu/memory combinations)."
  type        = number
  default     = 0.5
}

variable "container_memory" {
  description = "Memory allocation for the Container App (must pair with container_cpu per Azure Container Apps' supported combinations)."
  type        = string
  default     = "1Gi"
}

variable "allowed_origin" {
  description = "Value of the Access-Control-Allow-Origin header set by next.config.mjs (ALLOWED_ORIGIN). Defaults to the apex domain over HTTPS when unset."
  type        = string
  default     = null
}

variable "wp_domain" {
  description = "Hostname of the WordPress instance backing the blog (WP_DOMAIN)."
  type        = string
}

variable "wp_json_api_uri" {
  description = "Base path of the WordPress JSON REST API on wp_domain (WP_JSON_API_URI)."
  type        = string
  default     = "/wp-json/wp/v2"
}

variable "wp_posts_uri" {
  description = "Path appended to wp_domain for the WordPress posts endpoint (WP_POSTS_URI)."
  type        = string
  default     = "/wp-json/wp/v2/posts"
}

variable "resend_api_key_secret_name" {
  description = "Key Vault secret name that stores the Resend API key (RESEND_API_KEY). Terraform creates the secret container only, with its value ignored after creation - populate the real value out-of-band (e.g. `az keyvault secret set --name <this value> --vault-name <key_vault_name> --value ...`) so the key is never driven by a Terraform-managed value in this repo's history."
  type        = string
  default     = "resend-api-key"
}

variable "github_repository" {
  description = "GitHub \"owner/repo\" that is trusted to assume the deploy identity via OIDC."
  type        = string
  default     = "shgnplaatjies/ShaganPlaatjies"
}

variable "github_branches" {
  description = "Branches (mirroring deploy-to-cpanel.yml's main/stg split) that are each granted their own federated identity credential for GitHub Actions OIDC."
  type        = list(string)
  default     = ["main", "stg"]
}
