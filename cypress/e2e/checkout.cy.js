import { CheckoutPage } from "../pages/CheckoutPage";

describe("Checkout Form - Using test data variable from fixture", () => {
  const page = new CheckoutPage();
  let testData = {};

  before(() => {
    // Read and parse the test data file once
    cy.readFile("cypress/fixtures/testdata.txt").then((text) => {
      text.split("\n").forEach(line => {
        const [key, value] = line.split("=");
        if (key && value) testData[key.trim()] = value.trim();
      });
    });
  });

  it("fills the form using test data and submits", () => {
    page.visit();

    // Fill user + card details
    page.fillContact(testData);
    page.fillCard(testData);

    // Submit form
    page.submit();

    // Basic confirmation
    cy.contains(/thank you|success|confirmation|order/i, { timeout: 30000 })
      .should("be.visible");
  });
});
