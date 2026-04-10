import { test, expect } from "@playwright/test";

test.describe("Filters flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector('[data-testid="product-list"]');
  });

  test("search by title filters products", async ({ page }) => {
    const searchInput = page.getByTestId("search-input");
    await searchInput.fill("Cámara");

    const cards = page.getByTestId("product-card");
    await expect(cards).toHaveCount(1);
  });

  test("filter by category", async ({ page }) => {
    const categorySelect = page.getByTestId("category-select");
    await categorySelect.selectOption("Accesorios");

    const cards = page.getByTestId("product-card");
    await expect(cards).toHaveCount(4);
  });

  test("filter by price range", async ({ page }) => {
    const priceRange = page.getByTestId("price-range");
    await priceRange.fill("100");

    const cards = page.getByTestId("product-card");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const priceText = await card.locator(".product-card__price").innerText();
      const price = parseFloat(priceText.replace("$", ""));
      expect(price).toBeLessThanOrEqual(100);
    }
  });

  test("empty state when no results", async ({ page }) => {
    const searchInput = page.getByTestId("search-input");
    await searchInput.fill("xyznoexisteproducto");

    await expect(page.getByTestId("empty-state")).toBeVisible();
  });
});
