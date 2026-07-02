import { test, expect } from "@playwright/test";

// PortfolioPageContent renders its children twice - once in a "hidden
// sm:flex" desktop wrapper, once in a "sm:hidden flex" mobile wrapper - so
// the contact form (and every field in it, including their data-testid
// attributes) exists twice in the DOM at all times, with CSS controlling
// which copy is visible. The desktop wrapper is declared first in the JSX,
// so scoping to the first match lands on the one visible copy under the
// default (desktop) viewport used by this project.
test.describe("contact form", () => {
  test("happy path shows the success state", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, json: { success: true } })
    );

    await page.goto("/");

    const form = page.getByTestId("contact-form").first();

    await form.getByTestId("contact-name-input").fill("Ada Lovelace");
    await form.getByTestId("contact-email-input").fill("ada@example.com");
    await form
      .getByTestId("contact-company-input")
      .fill("Analytical Engines Ltd");
    await form.getByTestId("contact-service-select").click();
    await page.getByRole("option", { name: "System Architecture" }).click();
    await form
      .getByTestId("contact-message-input")
      .fill("Testing the contact form happy path.");

    await form.getByTestId("contact-submit").click();

    await expect(
      page.getByTestId("contact-success-message").first()
    ).toBeVisible();
  });

  test("error response surfaces the error state", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 500, json: { error: "Failed to send email" } })
    );

    await page.goto("/");

    const form = page.getByTestId("contact-form").first();

    await form.getByTestId("contact-name-input").fill("Ada Lovelace");
    await form.getByTestId("contact-email-input").fill("ada@example.com");
    await form
      .getByTestId("contact-company-input")
      .fill("Analytical Engines Ltd");
    await form.getByTestId("contact-service-select").click();
    await page.getByRole("option", { name: "System Architecture" }).click();
    await form
      .getByTestId("contact-message-input")
      .fill("Testing the contact form error path.");

    await form.getByTestId("contact-submit").click();

    await expect(
      page.getByTestId("contact-error-message").first()
    ).toBeVisible();
  });
});
