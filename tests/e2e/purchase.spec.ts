import { test, expect } from "@playwright/test";

test.describe("Purchase flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector('[data-testid="product-list"]');
  });

  test("add product to cart and verify badge", async ({ page }) => {
    const firstProduct = page
      .getByTestId("product-card")
      .first();
    const productLink = firstProduct.getByTestId("product-link");
    await productLink.click();

    await page.waitForSelector('[data-testid="add-to-cart"]');
    await page.getByTestId("add-to-cart").click();

    const badge = page.getByTestId("cart-badge");
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText("1");
  });

  test("open drawer, verify item, and remove it", async ({ page }) => {
    const firstProduct = page.getByTestId("product-card").first();
    await firstProduct.getByTestId("product-link").click();

    await page.waitForSelector('[data-testid="add-to-cart"]');
    await page.getByTestId("add-to-cart").click();

    await page.getByLabel("Abrir carrito").click();

    const drawer = page.getByTestId("cart-drawer");
    await expect(drawer).toHaveClass(/drawer--open/);

    const cartItem = page.getByTestId("cart-item");
    await expect(cartItem).toHaveCount(1);

    await page.getByTestId("remove-item").click();
    await expect(page.getByTestId("cart-empty")).toBeVisible();
  });

  test("add multiple units and verify quantity", async ({ page }) => {
    const firstProduct = page.getByTestId("product-card").first();
    await firstProduct.getByTestId("product-link").click();

    await page.waitForSelector('[data-testid="add-to-cart"]');
    await page.getByTestId("add-to-cart").click();
    await page.getByTestId("add-to-cart").click();

    const badge = page.getByTestId("cart-badge");
    await expect(badge).toHaveText("2");
  });
});
