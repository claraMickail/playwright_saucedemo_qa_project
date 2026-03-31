import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly addBackpackButton: Locator;
  readonly removeBackpackButton: Locator;
  readonly inventoryContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async removeBackpackFromCart() {
    await this.removeBackpackButton.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}