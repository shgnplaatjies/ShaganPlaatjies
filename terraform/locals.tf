locals {
  allowed_origin = coalesce(var.allowed_origin, "https://${var.domain_name}")
}
