import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".destination-card")).toHaveCount(4);
});
test("search, filters, reset, sorting and empty state", async ({ page }) => {
  await page.locator("#destination-input").fill("grecia");
  await expect(page.locator(".destination-card")).toHaveCount(1);
  await expect(page.locator(".destination-card h3")).toHaveText("Santorini");
  await page.locator("#all-destinations").click();
  await page.getByRole("button", { name: "Praia e mar", exact: true }).click();
  await expect(page.locator(".destination-card")).toHaveCount(2);
  await page.locator("#sort").selectOption("price");
  await expect(page.locator(".destination-card h3").first()).toHaveText(
    "Arraial do Cabo",
  );
  await page.locator("#all-destinations").click();
  await expect(page.locator("#sort")).toHaveValue("popular");
  await expect(page.locator(".destination-card")).toHaveCount(8);
  await page.locator("#destination-input").fill("inexistente");
  await expect(page.locator("#empty-state")).toBeVisible();
});
test("keyboard favorites, persistence, dialog estimate and accessible name", async ({
  page,
}) => {
  const button = page.locator('[data-save="bali"]');
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await page.locator('[data-details="bali"]').click();
  await expect(
    page.getByRole("dialog", { name: "Bali", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".dialog-estimate")).toContainText("9.180");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page
    .getByRole("button", { name: "Minhas viagens", exact: true })
    .click();
  await expect(page.locator(".destination-card")).toHaveCount(1);
  await page.locator('[data-save="bali"]').click();
  await expect(page.locator("#show-favorites")).toBeFocused();
});
test("newsletter has no stored personal data and stale favorites are ignored", async ({
  page,
}) => {
  await page.evaluate(() => {
    localStorage.setItem("brisa-favorites", '["bali","bali","expired",123]');
    localStorage.setItem("brisa-newsletter-email", "old@example.com");
  });
  await page.reload();
  await expect(page.locator("#favorite-count")).toHaveText("1");
  await page
    .getByRole("textbox", { name: "Seu e-mail", exact: true })
    .fill("new@example.com");
  await page
    .getByRole("button", { name: "Cadastrar e-mail", exact: true })
    .click();
  await expect(page.locator("#newsletter-message")).toContainText(
    "nenhum e-mail",
  );
  expect(
    await page.evaluate(() => localStorage.getItem("brisa-newsletter-email")),
  ).toBeNull();
});
test("mobile menu escape and outside click", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  const button = page.locator("#menu-button");
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.click();
  await page.locator("h1").click();
  await expect(button).toHaveAttribute("aria-expanded", "false");
});
test("WCAG automated checks, dialog and horizontal layout", async ({
  page,
}) => {
  let results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.locator('[data-details="bali"]').click();
  results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
test("local server protects private files and HTTP methods", async ({
  request,
}) => {
  expect((await request.get("/package.json")).status()).toBe(404);
  expect((await request.post("/")).status()).toBe(405);
  const response = await request.head("/fernando-de-noronha.jpg");
  expect(response.headers()["content-type"]).toBe("image/jpeg");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
});

test("fonts, no runtime errors, narrow layout and visual capture", async ({
  page,
}, testInfo) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () =>
        document.fonts.check('16px "DM Sans"') &&
        document.fonts.check("16px Manrope"),
    ),
  ).toBe(true);
  if (testInfo.project.name === "mobile") {
    await page.setViewportSize({ width: 320, height: 812 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.screenshot({
    path: testInfo.outputPath("site.png"),
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("search fields remain usable across tablet widths", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  for (const width of [541, 600, 768, 800, 1024]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const selector of [
      "#destination-input",
      "#travel-date",
      "#travelers",
    ]) {
      await expect(page.locator(selector)).toBeVisible();
      expect(
        await page
          .locator(selector)
          .evaluate((element) => element.getBoundingClientRect().width),
      ).toBeGreaterThan(90);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.locator("#travelers").selectOption("3");
    await page.locator('[data-details="bali"]').click();
    await expect(page.locator(".dialog-estimate")).toContainText("13.770");
    await page.keyboard.press("Escape");
  }
});
