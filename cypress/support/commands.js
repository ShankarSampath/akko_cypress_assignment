// Helpers for same-origin iframes (works if your payment iframes are same-origin)
Cypress.Commands.add("getIframeBody", (selector) => {
  return cy.get(selector, { timeout: 15000 })
    .its("0.contentDocument.body").should("not.be.empty")
    .then(cy.wrap);
});
