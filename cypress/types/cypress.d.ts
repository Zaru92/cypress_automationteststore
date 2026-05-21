declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Opens Automation Test Store home page.
       */
      openHomePage(): Chainable<void>;

      /**
       * Verifies that Automation Test Store home page is visible.
       */
      shouldSeeHomePage(): Chainable<void>;
    }
  }
}

export {};
