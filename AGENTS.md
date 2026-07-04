# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Running Playwright E2E locally

`npm run test:e2e` boots the app via `server.js` (`playwright.config.ts` webServer runs `npm run build && npm run start`), which requires `NODE_ENV=production`. `server.js` only requires and starts `@bitc/cnad` (a cPanel-only auto-deploy/restart helper) when `NODE_DIR` is set - see the Deployment section below - so no `NODE_DIR` workaround is needed to get the server to bind a port locally or in CI.

In a minimal sandbox with no system Chromium deps and no root access, `apt-get download <pkg>` (no sudo needed) + `dpkg-deb -x <pkg>.deb <prefix>` + `LD_LIBRARY_PATH=<prefix>/usr/lib/x86_64-linux-gnu` is a viable way to satisfy Chromium's shared-library requirements (libnspr4, libnss3, libatk*, libgtk-3-0, libpixman-1-0, libharfbuzz0b, libgraphite2-3, etc.) without `playwright install --with-deps`, which needs a password-less sudo that may not be available.

## Test hooks in components

`ElegantContactForm` (and its Playwright spec in `e2e/contact-form.spec.ts`) use `data-testid` attributes for stable selectors. Radix Themes components (`TextField.Root`, `TextArea`, `Select.Trigger`, `Button`) forward arbitrary DOM props, including `data-testid`, straight through to the real underlying `<input>`/`<textarea>`/`<button>` element (verified by reading `node_modules/@radix-ui/themes/dist/cjs/components/*.js`), so adding `data-testid` to these components works exactly like adding it to a plain HTML element.

`PortfolioPageContent` renders its children twice (a desktop wrapper and a mobile wrapper, toggled by CSS), so every `data-testid` in `ElegantContactForm` exists twice in the DOM at once. Any Playwright selector built on these testids needs `.first()` to land on the visible desktop copy under the default viewport.

## Deployment (cPanel to GCP Cloud Run migration)

The app is migrating off cPanel to GCP Cloud Run. `deploy-to-cpanel.yml` is still the live deployment path (triggers on push to `main`/`stg`); `deploy-cloud-run.yml` is the new parallel path, currently `workflow_dispatch`-only until a real GCP project exists and its vars/secrets are configured - see that workflow's header comment for exactly which ones. Nothing gets cut over until DNS is explicitly repointed in a later phase.

`Dockerfile` is a two-stage build, not the single `npm ci --omit=dev && npm run build` sequence the current app's `next.config.mjs`/`app/lib/fonts.ts` would suggest is enough: `next build` needs devDependencies (`typescript`, `eslint`, and critically `tailwindcss`, which `next/font/google`'s PostCSS pipeline requires even though Tailwind isn't otherwise imported at runtime). So the builder stage runs a full `npm ci`, and only the final runtime stage reinstalls with `npm ci --omit=dev`, keeping the shipped image free of dev dependencies. Verified by running the equivalent steps by hand (no Docker available in this sandbox to build the image directly): full install + build, then delete `node_modules` and reinstall with `--omit=dev`, then `node server.js` and curl it - this must succeed after any change to build tooling or `next.config.mjs`.

`server.js` reads `APP_PORT`, not Cloud Run's conventional `PORT` env var - the Dockerfile sets `APP_PORT=8080` and Cloud Run's `container_port` in `terraform/cloud_run.tf` must keep matching that value, since server.js's own env var scheme wasn't changed to keep this phase a pure infra addition.

`server.js`'s `@bitc/cnad` require/config/watch/start calls are gated behind `if (process.env.NODE_DIR)` rather than removed, since `deploy-to-cpanel.yml` sets `NODE_DIR` and relies on cnad re-running `npm install` on the live cPanel host when `package.json` changes and on watching `RESTART_FILE_PATH` to restart the app - neither of which the container path replaces. The Docker image never sets `NODE_DIR`, so this block is a no-op on Cloud Run; `@bitc/cnad` stays a runtime dependency in `package.json` for the cPanel path.

`terraform/` is a Cloud Run root module (Artifact Registry, Cloud Run v2 service with `min_instance_count = 0`, Secret Manager for `RESEND_API_KEY` with an IAM binding rather than a plaintext env var, and a Cloud DNS managed zone + global external HTTPS load balancer for `shaganplaatjies.co.za`). It has no backend configured and has never been applied - `project_id` and `container_image` have no defaults on purpose. `terraform validate` passes (verified with a scratch-downloaded Terraform 1.9.8 binary and `terraform init`, since no `terraform` binary or GCP credentials exist in this environment); `plan`/`apply` need a real project ID and credentials neither of which exist yet.

`terraform/load_balancer.tf` fronts Cloud Run with a global external HTTPS load balancer (regional serverless NEG backend, Google-managed SSL cert) rather than `google_cloud_run_domain_mapping`: that resource only provisions in a small fixed set of regions and Google doesn't consider it production-ready even there, and `africa-south1` (`variables.tf`'s `region` default) isn't on the supported list - see `terraform/README.md`'s "Why a load balancer instead of a domain mapping" section. This also means DNS resolves in a single `terraform apply`, since the load balancer's static IP is a plain resource attribute rather than a `for_each` key the way the domain mapping's DNS records were.
