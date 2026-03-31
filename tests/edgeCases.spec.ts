import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('Edge case and negative tests', () => {
  test('shows error when login is attempted with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('shows error when password is missing', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', '');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });

  test('redirects unauthenticated user away from inventory page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('shows validation error when checkout info is incomplete', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();

    await page.locator('[data-test="checkout"]').click();

    await checkoutPage.fillCheckoutInfo('', 'Mickail', 'H3A1A1');
    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('cart state persists after page refresh', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addBackpackToCart();
    await page.reload();

    await expect(inventoryPage.removeBackpackButton).toBeVisible();
  });

  test('different users should not inherit another user’s cart state in the same browser session', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // User A adds backpack
    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.removeBackpackButton).toBeVisible();

    // Log out
    await page.locator('#react-burger-menu-btn').click();
    await expect(page.locator('#logout_sidebar_link')).toBeVisible();
    await page.locator('#logout_sidebar_link').click();

    // Log in as User B
    await loginPage.login('problem_user', 'secret_sauce');

    // User B should not inherit User A's cart state
    await expect(inventoryPage.addBackpackButton).toBeVisible();
    await expect(inventoryPage.removeBackpackButton).toHaveCount(0);
    });

  
});





