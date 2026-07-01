# No `.env.example` for onboarding

## Current state
The repo has `.env`, `.env.local`, `.env.development`, and `.env.production` locally (all correctly git-ignored), but there is no committed `.env.example` documenting which variables exist or what they're for. From the deploy workflow, at least these are required somewhere in the stack: `NODE_DIR`, `ALLOWED_ORIGIN`, `RESTART_FILE_PATH`, `WP_DOMAIN`, `RESEND_API_KEY`, `PUBLIC_RESUME_URL`.

## Why it matters
If this repo is ever shown to another developer as a code sample, or if a future version of the setup needs to be reproduced on a new machine, there's currently no way to know which environment variables are required without spelunking through the deploy workflow secrets list and grepping the codebase for `process.env`. This is exactly the kind of thing that's trivial to document now and painful to reconstruct later.

## Suggested action
Add a committed `.env.example` with each required variable name and a one-line comment on its purpose (no real values) — e.g. `WP_DOMAIN` (WordPress content source), `RESEND_API_KEY` (contact form email delivery), `PUBLIC_RESUME_URL` (resume download link), etc. Reference it from the README setup section (see the README completeness note).
