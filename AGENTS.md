# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Running Playwright E2E locally

`npm run test:e2e` boots the app via `server.js` (`playwright.config.ts` webServer runs `npm run build && npm run start`), which requires `NODE_ENV=production`. `server.js` calls `cnad.config(process.env.NODE_DIR)` (a cPanel auto-deploy helper) on startup, and `cnad` exits the process immediately if `NODE_DIR` is unset - so a plain `npx playwright test` fails with `CNAD :::: Path to npm in production is required` before the server ever binds a port. Set `NODE_DIR` to the directory containing `bin/npm` (e.g. `NODE_DIR=$(dirname $(dirname $(which npm)))`) before running the suite.

In a minimal sandbox with no system Chromium deps and no root access, `apt-get download <pkg>` (no sudo needed) + `dpkg-deb -x <pkg>.deb <prefix>` + `LD_LIBRARY_PATH=<prefix>/usr/lib/x86_64-linux-gnu` is a viable way to satisfy Chromium's shared-library requirements (libnspr4, libnss3, libatk*, libgtk-3-0, libpixman-1-0, libharfbuzz0b, libgraphite2-3, etc.) without `playwright install --with-deps`, which needs a password-less sudo that may not be available.

## Test hooks in components

`ElegantContactForm` (and its Playwright spec in `e2e/contact-form.spec.ts`) use `data-testid` attributes for stable selectors. Radix Themes components (`TextField.Root`, `TextArea`, `Select.Trigger`, `Button`) forward arbitrary DOM props, including `data-testid`, straight through to the real underlying `<input>`/`<textarea>`/`<button>` element (verified by reading `node_modules/@radix-ui/themes/dist/cjs/components/*.js`), so adding `data-testid` to these components works exactly like adding it to a plain HTML element.

`PortfolioPageContent` renders its children twice (a desktop wrapper and a mobile wrapper, toggled by CSS), so every `data-testid` in `ElegantContactForm` exists twice in the DOM at once. Any Playwright selector built on these testids needs `.first()` to land on the visible desktop copy under the default viewport.
