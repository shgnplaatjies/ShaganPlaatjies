# Full zone delegation for shaganplaatjies.co.za, not just ownership
# verification records - point the registrar's name servers at
# dns_managed_zone_name_servers (see outputs.tf) to complete the cutover.
resource "google_dns_managed_zone" "primary" {
  name        = replace(var.domain_name, ".", "-")
  dns_name    = "${var.domain_name}."
  description = "Managed zone for ${var.domain_name}."
}

# Points the apex domain at the load balancer's static IP (see
# load_balancer.tf). Unlike google_cloud_run_domain_mapping, this IP is a
# plain resource attribute rather than a for_each key, so it resolves in a
# single apply with no two-pass workaround.
resource "google_dns_record_set" "app" {
  name         = google_dns_managed_zone.primary.dns_name
  managed_zone = google_dns_managed_zone.primary.name
  type         = "A"
  ttl          = 300
  rrdatas      = [google_compute_global_address.app.address]
}
