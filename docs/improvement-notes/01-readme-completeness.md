# README completeness

## Current state
`README.md` is two lines: the site title and a link to the live deployment. There is no description of the tech stack, no setup/dev instructions, no scripts reference, and no screenshots.

## Why it matters
This repo is itself a portfolio artifact — anyone who clicks through from the live site to the GitHub repo (recruiters, other developers, collaborators) lands on a near-empty README. For a project meant to demonstrate craft, the README is one of the first things a technical reviewer reads, and right now it undersells everything the codebase actually does (custom Next.js 15 app with an Express/PM2 server, Framer Motion + GSAP animation layer, WordPress-backed blog, Resend-powered contact form, a "desktop OS" themed UI with window cards).

## Suggested action
Expand the README with:
- A short project description and feature list (blog, projects, experience timeline, contact form, "desktop" UI theme)
- Tech stack table (Next.js 15, custom Express/PM2 server, Tailwind, Radix UI, Framer Motion/GSAP, Resend, WordPress as a headless content source)
- Local dev setup: `npm install`, `npm run dev` (note the `--experimental-https` flag and what it's for), required `.env` vars (see the companion note on `.env.example`)
- Available scripts (`dev`, `build`, `start`, `lint`, `verify`) and what each does
- 1-2 screenshots or a short GIF of the live site
