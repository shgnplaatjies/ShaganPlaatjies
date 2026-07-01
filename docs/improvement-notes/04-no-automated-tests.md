# No automated test coverage

## Current state
`package.json` has no test script and no testing framework in `dependencies`/`devDependencies` (no Jest, Vitest, Playwright, Testing Library, etc.). There's meaningful interactive surface area that could silently break: the contact form (`ElegantContactForm.tsx` → `app/api/contact` → Resend email), the WordPress-backed blog/project data fetching (`app/lib/wordpress-types.ts`, `server-lib.ts`), and dynamic routes (`app/blog/posts`, `app/experiences/[slug]`, `app/projects/[slug]`).

## Why it matters
For a personal portfolio, full unit-test coverage is overkill and not worth the time investment. But the contact form is the one piece of functional (not just visual) behavior on the site — if it silently breaks (a Resend API change, an env var typo, a schema mismatch with the WordPress source), the site keeps looking fine while quietly failing at its one real job: letting someone reach out.

## Suggested action
Skip broad unit testing. Add a small number of targeted checks instead:
- One Playwright (or even a simple script hitting the API route) end-to-end test for the contact form happy path
- One smoke test that hits each dynamic route type (a blog post, a project, an experience) and asserts a 200 response, to catch WordPress data-shape regressions early

This is a much smaller lift than full coverage and directly protects the one interactive feature that has real consequences if broken.
