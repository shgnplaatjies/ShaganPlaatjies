# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Running Playwright E2E locally

`npm run test:e2e` boots the app via `server.js` (`playwright.config.ts` webServer runs `npm run build && npm run start`), which requires `NODE_ENV=production`. `server.js` no longer depends on `@bitc/cnad` (a cPanel-only auto-deploy/restart helper, removed as part of the Cloud Run migration - see the Deployment section below), so no `NODE_DIR` workaround is needed to get the server to bind a port.

In a minimal sandbox with no system Chromium deps and no root access, `apt-get download <pkg>` (no sudo needed) + `dpkg-deb -x <pkg>.deb <prefix>` + `LD_LIBRARY_PATH=<prefix>/usr/lib/x86_64-linux-gnu` is a viable way to satisfy Chromium's shared-library requirements (libnspr4, libnss3, libatk*, libgtk-3-0, libpixman-1-0, libharfbuzz0b, libgraphite2-3, etc.) without `playwright install --with-deps`, which needs a password-less sudo that may not be available.

## Test hooks in components

`ElegantContactForm` (and its Playwright spec in `e2e/contact-form.spec.ts`) use `data-testid` attributes for stable selectors. Radix Themes components (`TextField.Root`, `TextArea`, `Select.Trigger`, `Button`) forward arbitrary DOM props, including `data-testid`, straight through to the real underlying `<input>`/`<textarea>`/`<button>` element (verified by reading `node_modules/@radix-ui/themes/dist/cjs/components/*.js`), so adding `data-testid` to these components works exactly like adding it to a plain HTML element.

`PortfolioPageContent` renders its children twice (a desktop wrapper and a mobile wrapper, toggled by CSS), so every `data-testid` in `ElegantContactForm` exists twice in the DOM at once. Any Playwright selector built on these testids needs `.first()` to land on the visible desktop copy under the default viewport.

## Deployment (cPanel to GCP Cloud Run migration)

The app is migrating off cPanel to GCP Cloud Run. `deploy-to-cpanel.yml` is still the live deployment path (triggers on push to `main`/`stg`); `deploy-cloud-run.yml` is the new parallel path, currently `workflow_dispatch`-only until a real GCP project exists and its vars/secrets are configured - see that workflow's header comment for exactly which ones. Nothing gets cut over until DNS is explicitly repointed in a later phase.

`Dockerfile` is a two-stage build, not the single `npm ci --omit=dev && npm run build` sequence the current app's `next.config.mjs`/`app/lib/fonts.ts` would suggest is enough: `next build` needs devDependencies (`typescript`, `eslint`, and critically `tailwindcss`, which `next/font/google`'s PostCSS pipeline requires even though Tailwind isn't otherwise imported at runtime). So the builder stage runs a full `npm ci`, and only the final runtime stage reinstalls with `npm ci --omit=dev`, keeping the shipped image free of dev dependencies. Verified by running the equivalent steps by hand (no Docker available in this sandbox to build the image directly): full install + build, then delete `node_modules` and reinstall with `--omit=dev`, then `node server.js` and curl it - this must succeed after any change to build tooling or `next.config.mjs`.

`server.js` reads `APP_PORT`, not Cloud Run's conventional `PORT` env var - the Dockerfile sets `APP_PORT=8080` and Cloud Run's `container_port` in `terraform/cloud_run.tf` must keep matching that value, since server.js's own env var scheme wasn't changed to keep this phase a pure infra addition.

`terraform/` is a Cloud Run root module (Artifact Registry, Cloud Run v2 service with `min_instance_count = 0`, Secret Manager for `RESEND_API_KEY` with an IAM binding rather than a plaintext env var, and a Cloud DNS managed zone + Cloud Run domain mapping for `shaganplaatjies.co.za`). It has no backend configured and has never been applied - `project_id` and `container_image` have no defaults on purpose. `terraform validate` passes (verified with a scratch-downloaded Terraform 1.9.8 binary and `terraform init`, since no `terraform` binary or GCP credentials exist in this environment); `plan`/`apply` need a real project ID and credentials neither of which exist yet.

The Cloud Run domain mapping's DNS records (`google_cloud_run_domain_mapping.app.status[0].resource_records`) are only known after that resource is actually created, so the `google_dns_record_set.domain_mapping` `for_each` in `terraform/dns.tf` can't resolve its keys on a from-scratch plan. This needs a two-pass apply (`terraform apply -target=google_cloud_run_domain_mapping.app` then `terraform apply` again) - see `terraform/README.md`.
