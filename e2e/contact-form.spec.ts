import { test, expect } from "@playwright/test";

// PortfolioPageContent renders its children twice - once in a "hidden
// sm:flex" desktop wrapper, once in a "sm:hidden flex" mobile wrapper - so
// the contact form (and every field in it) exists twice in the DOM at all
// times, with CSS controlling which copy is visible. The desktop wrapper is
// declared first in the JSX, so scoping to the first <form> lands on the
// one visible copy under the default (desktop) viewport used by this project.
test.describe("contact form", () => {
  test("happy path shows the success state", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, json: { success: true } })
    );

    await page.goto("/");

    const form = page.locator("form").first();

    await form.getByPlaceholder("Your name").fill("Ada Lovelace");
    await form.getByPlaceholder("your@email.com").fill("ada@example.com");
    await form.getByPlaceholder("Your company").fill("Analytical Engines Ltd");
    await form.getByRole("combobox").click();
    await page.getByRole("option", { name: "System Architecture" }).click();
    await form
      .getByPlaceholder("What's on your mind? Share any context, timeline, or specific goals...")
      .fill("Testing the contact form happy path.");

    await form.getByRole("button", { name: "Let's Connect" }).click();

    await expect(page.getByText("Thank you for reaching out")).toBeVisible();
  });

  test("error response surfaces the error state", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 500, json: { error: "Failed to send email" } })
    );

    await page.goto("/");

    const form = page.locator("form").first();

    await form.getByPlaceholder("Your name").fill("Ada Lovelace");
    await form.getByPlaceholder("your@email.com").fill("ada@example.com");
    await form.getByPlaceholder("Your company").fill("Analytical Engines Ltd");
    await form.getByRole("combobox").click();
    await page.getByRole("option", { name: "System Architecture" }).click();
    await form
      .getByPlaceholder("What's on your mind? Share any context, timeline, or specific goals...")
      .fill("Testing the contact form error path.");

    await form.getByRole("button", { name: "Let's Connect" }).click();

    await expect(
      page.getByText("Failed to send message. Please try again.")
    ).toBeVisible();
  });
});
