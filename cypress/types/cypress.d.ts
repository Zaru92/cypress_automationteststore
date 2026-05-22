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

      /**
       * Searches product by keyword using the global search input.
       */
      searchProduct(keyword: string): Chainable<void>;

      /**
       * Verifies that search results are displayed for provided keyword.
       */
      shouldSeeSearchResults(keyword: string): Chainable<void>;
    }
  }
}

export {};
