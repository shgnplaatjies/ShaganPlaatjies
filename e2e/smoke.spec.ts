import { test, expect } from "@playwright/test";

// These hit the real, live WordPress backend (WP_DOMAIN) rather than a mock -
// acceptable for a personal site with a stable, always-on headless CMS. Named
// "(live WP)" so a WordPress hiccup isn't mistaken for a code regression.

test("smoke: blog post renders (live WP)", async ({ page }) => {
  await page.goto("/blog");

  const postLink = page.locator('a[href^="/blog/posts/"]').first();
  await expect(postLink).toBeVisible();
  await postLink.click();

  await expect(page).toHaveURL(/\/blog\/posts\//);
  await expect(page.locator("h1, h2").first()).toBeVisible();
});

test("smoke: project page renders (live WP)", async ({ page }) => {
  await page.goto("/projects");

  // ProjectCard can link out to an external companyUrl instead of the
  // internal slug page, so select the internal link specifically.
  const projectLink = page.locator('a[href^="/projects/"]').first();
  await expect(projectLink).toBeVisible();
  await projectLink.click();

  await expect(page).toHaveURL(/\/projects\//);
  await expect(page.locator("h1, h2").first()).toBeVisible();
});

test("smoke: experience page renders (live WP)", async ({ page }) => {
  // The listing page is singular ("/experience"); detail routes are plural
  // ("/experiences/[slug]") - intentional split in this codebase, not a typo.
  await page.goto("/experience");

  // ExperienceCard can also link out to an external companyUrl.
  const experienceLink = page.locator('a[href^="/experiences/"]').first();
  await expect(experienceLink).toBeVisible();
  await experienceLink.click();

  await expect(page).toHaveURL(/\/experiences\//);
  await expect(page.locator("h1, h2").first()).toBeVisible();
});
