# SEO / discovery metadata gaps

## Current state
`app/layout.tsx` only sets `title` and `description` in the root `Metadata` export. There is no `robots.txt` or `sitemap.xml` in `public/`, no Open Graph or Twitter card metadata (`openGraph`, `twitter` fields on the `Metadata` object), and no `manifest.json` for PWA/installability.

## Why it matters
This is a portfolio site whose entire purpose is to be found and shared — by recruiters via search, and by links dropped in Slack/LinkedIn/Twitter. Without Open Graph tags, a shared link renders as a bare URL with no preview image or description in any chat app or social platform. Without a sitemap, search engines have to rely purely on crawling the site's internal links to discover the blog posts and project pages under `app/blog`, `app/projects/[slug]`, `app/experiences/[slug]`.

## Suggested action
- Add `openGraph` and `twitter` fields to the root metadata (and per-page `generateMetadata` for blog/project detail pages, using each post/project's own title/description/cover image)
- Add a static or dynamically generated `sitemap.xml` (Next.js 15 supports a `sitemap.ts` route convention) covering blog posts and project slugs
- Add `robots.txt` (Next.js supports a `robots.ts` convention too)
- Consider a `public/manifest.json` for basic PWA metadata (theme color, icons) given there's already a `favicon.svg`
