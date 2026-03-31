# Playwright UI Test Suite for Sauce Demo

## Overview
This project is a small end-to-end UI automation suite built with Playwright and TypeScript for the Sauce Demo web application (`https://www.saucedemo.com/`). It was created to demonstrate automated testing, Page Object Model structure, happy-path validation, and QA-oriented edge-case thinking.

## Tools Used
- Playwright
- TypeScript
- GitHub Actions
- Page Object Model (POM)

## Project Structure
- `pages/loginPage.ts` – login page object
- `pages/inventoryPage.ts` – inventory/cart-related page object
- `pages/checkoutPage.ts` – checkout page object
- `tests/login.spec.ts` – login-related tests
- `tests/checkout.spec.ts` – checkout and cart flow tests
- `tests/edgeCases.spec.ts` – negative and edge-case tests

## Test Cases Implemented

### Login Tests
- Successful login with `standard_user`
- Locked-out user shows an error message
- Login attempt with empty username and password
- Login attempt with missing password

### Inventory / Cart Tests
- Add item to cart from inventory page
- Remove item from inventory page
- Cart state persists after page refresh

### Checkout Tests
- Successful checkout with one item and valid user information
- Validation error when checkout information is incomplete

### Access / Navigation Behavior
- Direct navigation to the inventory page without authentication redirects the user

### Session / State Behavior
- Verified whether cart/item state persists across logout and login with a different user in the same browser session

## Edge Cases Explored
- Empty login fields
- Missing password on login
- Locked-out user behavior
- Unauthorized direct navigation to a protected page
- Missing required checkout fields
- Cart persistence after refresh
- Cart/item state persistence across different users in the same browser session
- UI/product behavior review for quantity handling

## QA Observations
- The cart UI includes a quantity column, but the application does not expose a way to increase the quantity of a single item beyond 1. This may be an intentional design rule rather than a defect, but it is worth validating as a product requirement because the interface suggests quantity is a tracked value.
- A user-isolation test was added to check whether an item added by one user remains marked as added after logout and login as a different user in the same browser session.

## Findings
- The application correctly blocks invalid login attempts and displays validation errors for missing required fields.
- Direct navigation to the inventory page without authentication does not allow unauthorized access.
- Cart state persists after refresh, which is important for maintaining a stable user experience.
- The cart UI displays a quantity column, but the application does not provide a way to increase quantity above 1 for a single item. This appears to be either an intentional product constraint or a requirement worth clarifying.
- A test expecting user-specific cart isolation failed across Chromium, Firefox, and WebKit. In the observed behavior, item/cart state remained marked as added after logging out and signing in as a different user within the same browser session. This suggests session-based state persistence rather than strict user-level cart isolation.

## Goal
The goal of this project is to show not only happy-path automation, but also the ability to structure maintainable UI tests and think critically about hidden edge cases, state management, and product behavior.

## How to Run

Install dependencies:

```bash
npm install