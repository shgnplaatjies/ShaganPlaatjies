# Fronts the Cloud Run service with a global external Application Load
# Balancer instead of google_cloud_run_domain_mapping. Domain mappings only
# work in a small fixed set of regions (asia-east1, asia-northeast1,
# asia-southeast1, europe-north1, europe-west1, europe-west4, us-central1,
# us-east1, us-east4, us-west1 as of this writing) and Google does not
# consider them production-ready even there - africa-south1 (this module's
# region, chosen for locality to shaganplaatjies.co.za's audience) is not on
# that list, so the mapping would fail at apply time. A global external
# HTTPS load balancer with a regional serverless NEG backend is Google's
# documented replacement and works with a Cloud Run service in any region.
resource "google_compute_region_network_endpoint_group" "app" {
  name                  = "${var.service_name}-neg"
  region                = var.region
  network_endpoint_type = "SERVERLESS"

  cloud_run {
    service = google_cloud_run_v2_service.app.name
  }
}

resource "google_compute_backend_service" "app" {
  name                  = "${var.service_name}-backend"
  load_balancing_scheme = "EXTERNAL_MANAGED"

  backend {
    group = google_compute_region_network_endpoint_group.app.id
  }
}

resource "google_compute_managed_ssl_certificate" "app" {
  name = "${var.service_name}-cert"

  managed {
    domains = [var.domain_name]
  }
}

resource "google_compute_url_map" "app" {
  name            = "${var.service_name}-url-map"
  default_service = google_compute_backend_service.app.id
}

resource "google_compute_target_https_proxy" "app" {
  name             = "${var.service_name}-https-proxy"
  url_map          = google_compute_url_map.app.id
  ssl_certificates = [google_compute_managed_ssl_certificate.app.id]
}

resource "google_compute_global_address" "app" {
  name = "${var.service_name}-lb-ip"
}

resource "google_compute_global_forwarding_rule" "https" {
  name                  = "${var.service_name}-https-forwarding-rule"
  target                = google_compute_target_https_proxy.app.id
  port_range            = "443"
  ip_address            = google_compute_global_address.app.address
  load_balancing_scheme = "EXTERNAL_MANAGED"
}

# Plain HTTP requests get redirected to HTTPS rather than dropped.
resource "google_compute_url_map" "http_redirect" {
  name = "${var.service_name}-http-redirect"

  default_url_redirect {
    https_redirect = true
    strip_query    = false
  }
}

resource "google_compute_target_http_proxy" "app" {
  name    = "${var.service_name}-http-proxy"
  url_map = google_compute_url_map.http_redirect.id
}

resource "google_compute_global_forwarding_rule" "http" {
  name                  = "${var.service_name}-http-forwarding-rule"
  target                = google_compute_target_http_proxy.app.id
  port_range            = "80"
  ip_address            = google_compute_global_address.app.address
  load_balancing_scheme = "EXTERNAL_MANAGED"
}
