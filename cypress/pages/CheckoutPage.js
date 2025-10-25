// A Page Object Model class for the Checkout Page
export class CheckoutPage {
  visit() {
    cy.visit("/us/dynamic-checkout/phone-plan?interval=annual");
  }

  // --- Iframe Selectors (External) ---
  // Using the robust 'title' attribute to differentiate the three iframes.
  privateCardNumberIframe = 'iframe[title="Secure card number input frame"]';
  privateExpDateIframe = 'iframe[title="Secure expiration date input frame"]';
  privateCvcIframe = 'iframe[title="Secure CVC input frame"]';

  // --- Form fields (Main Page) ---
  phoneNumber() { return cy.get('input[placeholder="Cell Phone Number"]'); }
  firstName() { return cy.get('input[placeholder="First Name"]'); }
  lastName()  { return cy.get('input[placeholder="Last Name"]'); }
  // Updated selector for exact placeholder match
  email()     { return cy.get('input[placeholder="Email Address"]'); }
  postcode()  { return cy.get('input[placeholder="Postal Code"]');}
  autocompleteItem() { return cy.get('.pac-item'); }
  // Updated to target button with exact text
  termsCheckbox() { return cy.get('input[type="checkbox"]'); }
  registerBtn() { return cy.contains("button", "Register Now"); }

  // --- Card fields (Selectors WITHIN their respective Iframe) ---
  // These selectors MUST be unique attributes found inside the iframes.
  // Using 'name' attributes as a common Stripe convention. Verify these in DevTools!
  iframeCardNumberInput() {
      return cy.get('input[name="cardnumber"]');
  }
  iframeExpDateInput()    {
      return cy.get('input[name="exp-date"]');
  }
  iframeCvcInput()        {
      return cy.get('input[name="cvc"]');
  }

  // --- Actions ---

  fillContact(data) {
    this.phoneNumber().clear().type(data.phoneNumber);
    this.firstName().clear().type(data.firstName);
    this.lastName().clear().type(data.lastName);
    this.email().clear().type(data.email);
    this.postcode().clear().type(data.postalCode);
  }


  fillCard(data) {
    cy.log('Filling Card Number in Iframe');
    // 1. Card Number
    cy.iframe(this.privateCardNumberIframe).within(() => {
        this.iframeCardNumberInput().type(data.cardNumber);
    });

    cy.log('Filling Expiry Date in Iframe');
    // 2. Expiry Date (MM/YY)
    cy.iframe(this.privateExpDateIframe).within(() => {
        this.iframeExpDateInput().type(data.exp);
    });

    cy.log('Filling CVC in Iframe');
    // 3. CVC
    cy.iframe(this.privateCvcIframe).within(() => {
        this.iframeCvcInput().type(data.cvc);
    });
  }

  checkTerms() {
      // Use .check() for reliability, which automatically clicks if unchecked
      this.termsCheckbox().check({ force: true });
  }

  submit() {
    cy.log('Waiting for Register Now button to be enabled...');

    // 1. Wait for the button element to exist AND become enabled
    this.registerBtn().should('exist').and('be.enabled');
    this.registerBtn().click({ force: true });
  }
}