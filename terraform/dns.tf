# Full zone delegation for shaganplaatjies.co.za, not just ownership
# verification records - point the registrar's name servers at
# dns_managed_zone_name_servers (see outputs.tf) to complete the cutover.
resource "google_dns_managed_zone" "primary" {
  name        = replace(var.domain_name, ".", "-")
  dns_name    = "${var.domain_name}."
  description = "Managed zone for ${var.domain_name}."
}

# Custom domain mapping for the Cloud Run service. This requires the domain
# to already be verified for this GCP project via Google Search Console
# (https://search.google.com/search-console) - that one-time ownership
# proof can't be automated by Terraform.
resource "google_cloud_run_domain_mapping" "app" {
  location = var.region
  name     = var.domain_name

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.app.name
  }
}

# The records Google issues for the mapping (google_cloud_run_domain_mapping
# .app.status[0].resource_records) are only known once that resource has
# actually been created, so on a from-scratch apply the for_each keys below
# aren't knowable at plan time. Apply in two passes, as Google's own
# Terraform guidance for this resource recommends:
#   terraform apply -target=google_cloud_run_domain_mapping.app
#   terraform apply
# the first pass creates the mapping and populates its status; the second
# creates these DNS records from that now-known status.
locals {
  domain_mapping_rrdata_by_type = {
    for rr in google_cloud_run_domain_mapping.app.status[0].resource_records :
    rr.type => rr.rrdata...
  }
}

resource "google_dns_record_set" "domain_mapping" {
  for_each     = local.domain_mapping_rrdata_by_type
  name         = google_dns_managed_zone.primary.dns_name
  managed_zone = google_dns_managed_zone.primary.name
  type         = each.key
  ttl          = 300
  rrdatas      = each.value
}
