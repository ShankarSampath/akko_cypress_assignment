import { CheckoutPage } from "../pages/CheckoutPage";

describe("Checkout Form - Using test data variable from fixture", () => {
  // Instantiate the Page Object Model
  const page = new CheckoutPage();

  // Object to hold the parsed test data
  let testData = {};

  before(() => {
    // Read and parse the test data file once
    cy.readFile("cypress/fixtures/testdata.txt").then((text) => {
      // Split the text file by new line and then by '=' to build the key-value object
      text.split("\n").forEach(line => {
        const [key, value] = line.split("=");
        // Ensure both key and value exist before adding to testData
        if (key && value) {
            testData[key.trim()] = value.trim();
        }
      });
      // Log the loaded data (optional, but helpful for debugging)
      cy.log('Loaded Test Data:', JSON.stringify(testData));
    });
  });

  it("fills the form using test data and submits", () => {
    page.visit();
    cy.log('Filling contact details...');
    page.fillContact(testData);
    cy.log('Filling card details in Stripe iframes...');
    page.fillCard(testData);
    cy.log('Checking terms and conditions...');
    page.checkTerms();
    cy.log('Submitting the form...');
    page.submit();
    cy.log('Verifying submission success...');
    cy.contains(/success/i, { timeout: 30000 })
      .should("be.visible");
  });
});