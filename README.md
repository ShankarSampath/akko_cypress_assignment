You already received a complete `README.md` file in the previous exchange. Here it is again, formatted in Markdown, which you can copy and paste directly into your project's `README.md` file.

-----

# Cypress Checkout Automation Framework 🛒

This project contains an automated test suite for the checkout flow, implemented using **Cypress** and the **Page Object Model (POM)** design pattern. It is specifically configured to handle cross-origin payment fields (Stripe iframes) and dynamic UI dependencies.

-----

## 🚀 Project Setup

### Prerequisites

You must have **Node.js** and **npm** installed on your machine.

### Installation Steps

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/ShankarSampath/akko_cypress_assignment.git
    cd akko_cypress_assignment

    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

    *This installs Cypress and essential plugins, including `cypress-iframe`.*

-----

## 🛠️ Configuration and Security

### ⚠️ Critical Step: Cross-Origin Security

The checkout page uses cross-origin iframes (Stripe) for payment fields. To allow Cypress to interact with these sensitive elements, you **must disable web security**.

Ensure your `cypress.config.js` file (or `cypress.json` for older versions) contains the following configuration:

```javascript
// cypress.config.js (Example)
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://staging.checkout.akko.app', // Update with your actual URL
    chromeWebSecurity: false, // REQUIRED for cross-origin iframe handling (Stripe)
    setupNodeEvents(on, config) {
      // ...
    },
  },
});
```

### Test Data Fixture

Test data for all scenarios is loaded from the `testdata.txt` file located at `cypress/fixtures/testdata.txt`. The keys used in the tests are:

```txt
# Test data keys
firstName=...
lastName=...
email=...
fullAddress=... (Used to bypass the Autocomplete dropdown)

# Payment Details (Use valid Stripe test card data)
cardNumber=...
exp=...
cvc=...
```

-----

## 💡 Framework Structure (Page Object Model)

The framework strictly adheres to the Page Object Model for separation of concerns:

| Directory | Purpose | Key Files |
| :--- | :--- | :--- |
| `cypress/pages` | **Page Objects:** Defines selectors and reusable actions for the Checkout page. | `CheckoutPage.js` |
| `cypress/e2e` | **Test Specs:** Contains the actual test scenarios and assertions. | `checkout.cy.js` |
| `cypress/fixtures` | **Test Data:** Externalized data source. | `testdata.txt` |

### Key POM Methods

The `CheckoutPage.js` class includes:

| Method | Description |
| :--- | :--- |
| `fillContact(data)` | Fills Name, Email, and types the complete address directly into the Postal Code field. |
| `fillCard(data)` | **Handles the three cross-origin Stripe iframes** sequentially using unique internal selectors. |
| `submit()` | Clicks the "Register Now" button, with an explicit wait (`.should('be.enabled')`) to ensure the button is activated. |

-----

## 🧪 Running the Tests

### Open the Cypress Test Runner (Interactive Mode)

Use this command to open the Cypress application, select your browser, and run tests interactively:

```bash
npx cypress run --browser chrome --headed
```
