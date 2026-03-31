import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('Checkout flow tests', () => {
  test('successful checkout with one item', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.inventoryContainer).toBeVisible();

    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();

    await page.locator('[data-test="checkout"]').click();

    await checkoutPage.fillCheckoutInfo('Clara', 'Mickail', 'H3A1A1');
    await checkoutPage.continueCheckout();
    await checkoutPage.finishCheckout();

    await expect(checkoutPage.completeHeader).toBeVisible();
    await expect(checkoutPage.completeHeader).toContainText('Thank you');
  });

  test('can remove item from inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.removeBackpackButton).toBeVisible();

    await inventoryPage.removeBackpackFromCart();
    await expect(inventoryPage.addBackpackButton).toBeVisible();
  });
});