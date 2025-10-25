export class CheckoutPage {
  visit() {
    cy.visit("/us/dynamic-checkout/phone-plan?interval=annual");
  }

  // --- Form fields ---
  firstName() { return cy.get('input[placeholder="First Name"]'); }
  lastName()  { return cy.get('input[placeholder="Last Name"]'); }
  email()     { return cy.get('input[placeholder*="Email"]'); }
  city()      { return cy.get('input[placeholder*="City"]'); }

  // --- Card fields (direct inputs only) ---
  cardNumber() { return cy.get('input[placeholder="1234 1234 1234 1234"]'); }
  expDate()    { return cy.get('input[placeholder="MM / YY"]'); }
  cvc()        { return cy.get('input[placeholder="CVC"]'); }

  registerBtn() { return cy.contains("button", /Register Now|Pay|Submit/i); }

  // --- Actions ---
  fillContact(data) {
    this.firstName().clear().type(data.firstName);
    this.lastName().clear().type(data.lastName);
    this.email().clear().type(data.email);
    this.city().clear().type(data.city);
  }

  fillCard(data) {
    this.cardNumber().type(data.cardNumber);
    this.expDate().type(data.exp);
    this.cvc().type(data.cvc);
  }

  submit() {
    this.registerBtn().click({ force: true });
  }
}
