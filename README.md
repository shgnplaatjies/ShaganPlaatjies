# Shagan Plaatjies

[View Live](https://shaganplaatjies.co.za)

## About

This is the source for my personal portfolio site.
It is a Next.js 15 App Router application with a custom Express server, styled as a "desktop OS" experience: content is presented as draggable window cards on a desktop-style canvas rather than a conventional scrolling page.

### Features

- **Desktop OS themed UI** - sections are rendered as window cards (with window chrome and controls) on a desktop-style canvas, animated with Framer Motion and GSAP.
- **Blog** - posts are authored in WordPress and pulled in as a headless CMS, then rendered as native Next.js pages at `/blog`.
- **Projects** - a project showcase at `/projects`, with individual project detail pages.
- **Experience timeline** - a work history / experience section at `/experience`.
- **Contact form** - a contact form backed by a Next.js API route (`app/api/contact`) that sends email via Resend.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Server | Custom [Express](https://expressjs.com/) server (`server.js`), process-managed with [PM2](https://pm2.keymetrics.io/) in production |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| UI primitives | [Radix UI](https://www.radix-ui.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) and [GSAP](https://gsap.com/) |
| Email | [Resend](https://resend.com/) (contact form + React Email templates) |
| Content | [WordPress](https://wordpress.org/) as a headless CMS for blog posts |

## Local development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

`dev` runs `next dev --experimental-https`.
The `--experimental-https` flag serves the local dev build over HTTPS (with a self-signed certificate) because `server.js` wraps the Next.js request handler in a local HTTPS server outside of production.

You will need a set of environment variables for things like the WordPress domain, Resend API key, contact form recipient, SSL cert paths, and the app port.
These are documented in `.env.example`.

## Scripts

| Script | Command | Description |
| --- | --- | --- |
| `npm run dev` | `next dev --experimental-https` | Runs the Next.js dev server locally over HTTPS with hot reload. |
| `npm run build` | `next build` | Produces an optimized production build. |
| `npm run start` | `node server.js` | Serves the production build through the custom Express server. |
| `npm run lint` | `next lint` | Lints the codebase with ESLint (`next/core-web-vitals`). |
| `npm run verify` | `tsc --noEmit && next lint` | Type-checks the project, then lints it. Useful as a single pre-commit / CI sanity check. |

## Screenshots

### Home

![Home page](docs/screenshots/home.png)

The home page renders as a desktop-style window with a sidebar navigation menu, matching the "desktop OS" theme described above.

### Projects

![Projects page](docs/screenshots/projects.png)

The projects list is populated from WordPress at build/request time.
The screenshot above was captured in a sandboxed environment without network access to the WordPress instance, so it only shows the static landing header; with WordPress reachable, this page also renders a card per project.
