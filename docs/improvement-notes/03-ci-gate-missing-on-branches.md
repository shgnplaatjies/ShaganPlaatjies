# No CI gate on branches/PRs

## Current state
The only workflow, `.github/workflows/deploy-to-cpanel.yml`, triggers on `push` to `main` and `stg` and goes straight to a build-and-deploy job. There is no workflow that runs on pull requests or feature branches, and the repo already has `lint` and `verify` (`tsc --noEmit && next lint`) scripts defined in `package.json` that currently aren't wired into CI at all.

## Why it matters
Right now, the first time a broken build, type error, or lint failure would be caught automatically is during the deploy to `main`/`stg` itself — there's no earlier, cheaper checkpoint on a feature branch or PR. Given the repo already has branches like `bugfix/BrokenDeploymentPipeline`, catching regressions before they reach a deploy-triggering branch would save the deploy-and-discover cycle.

## Suggested action
Add a lightweight `.github/workflows/ci.yml` that runs on `pull_request` (and optionally `push` to non-deploy branches):
- `npm ci`
- `npm run verify` (already exists — just needs to be invoked)
- `npm run build`

This is a small, additive change (doesn't touch the existing deploy workflow) and gives a pass/fail signal on every branch before it's merged toward `main`/`stg`.
