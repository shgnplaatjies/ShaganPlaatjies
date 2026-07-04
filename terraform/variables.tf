variable "project_id" {
  description = "GCP project ID that hosts every resource in this module. No default - must be supplied once a real project exists."
  type        = string
}

variable "region" {
  description = "GCP region for the Cloud Run service, Artifact Registry repository, and the load balancer's serverless NEG backend. africa-south1 (Johannesburg) is closest to shaganplaatjies.co.za's audience."
  type        = string
  default     = "africa-south1"
}

variable "domain_name" {
  description = "Apex domain served by this deployment. The Cloud DNS zone created here takes full delegation for it, not just verification records."
  type        = string
  default     = "shaganplaatjies.co.za"
}

variable "service_name" {
  description = "Name of the Cloud Run service."
  type        = string
  default     = "shaganplaatjies"
}

variable "artifact_repository_id" {
  description = "Artifact Registry repository ID that stores the app's container images."
  type        = string
  default     = "shaganplaatjies"
}

variable "container_image" {
  description = "Fully-qualified image reference to deploy, e.g. \"africa-south1-docker.pkg.dev/<project_id>/<artifact_repository_id>/shaganplaatjies:<tag>\". Supplied by the deploy workflow after it pushes a new image - no default, since no image exists until the first build."
  type        = string
}

variable "min_instance_count" {
  description = "Minimum Cloud Run instance count. 0 gives true scale-to-zero; cold starts are acceptable for this low-traffic site."
  type        = number
  default     = 0
}

variable "max_instance_count" {
  description = "Maximum Cloud Run instance count."
  type        = number
  default     = 2
}

variable "container_cpu" {
  description = "CPU limit for the Cloud Run container."
  type        = string
  default     = "1"
}

variable "container_memory" {
  description = "Memory limit for the Cloud Run container."
  type        = string
  default     = "512Mi"
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

variable "resend_api_key_secret_id" {
  description = "Secret Manager secret ID that stores the Resend API key (RESEND_API_KEY). Terraform creates the secret container and IAM binding only - populate the value out-of-band (e.g. `gcloud secrets versions add <id> --data-file=-`) so the key never enters Terraform state."
  type        = string
  default     = "resend-api-key"
}
