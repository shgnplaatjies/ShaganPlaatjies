import { defineConfig, devices } from "@playwright/test";

// server.js (our custom Express entrypoint) only serves plain HTTP when
// NODE_ENV=production - otherwise it takes the local-SSL branch and expects
// dev certs. We pin a fixed port here (rather than relying on whatever
// APP_PORT happens to be in .env.production) so baseURL always matches the
// server webServer spins up below.
const PORT = "4310";
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  timeout: 60_000,
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  // Build + start via the real npm scripts so we exercise the same
  // server.js entrypoint used in production, not `next start` directly.
  webServer: {
    command: "npm run build && npm run start",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    // Generous timeout: this runs a full `next build` before starting the
    // server, which can take a while on a loaded/shared machine.
    timeout: 600_000,
    env: {
      NODE_ENV: "production",
      APP_PORT: PORT,
      WP_DOMAIN: process.env.WP_DOMAIN ?? "staging.blog.shaganplaatjies.co.za",
      WP_JSON_API_URI: process.env.WP_JSON_API_URI ?? "/wp-json/wp/v2",
      WP_POSTS_URI: process.env.WP_POSTS_URI ?? "/wp-json/wp/v2/posts",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
