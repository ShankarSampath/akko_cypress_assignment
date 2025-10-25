const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  projectId: '4vmbvd',
  e2e: {
    baseUrl: "https://staging.checkout.akko.app",
    specPattern: "cypress/e2e/**/*.cy.js",
    video: true,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    }
  },
  env: {
    allure: true,
    CARD_NUMBER: "4242424242424242",
    CARD_EXP: "12/34",
    CARD_CVV: "123"
  }
});
