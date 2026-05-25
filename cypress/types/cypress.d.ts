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

      /**
       * Opens first product from search results.
       */
      openFirstProductFromSearchResults(): Chainable<void>;

      /**
       * Verifies that product details page is visible.
       */
      shouldSeeProductDetailsPage(): Chainable<void>;

      /**
       * Searches product, opens product details and adds it to cart.
       */
      addProductToCart(productName: string, searchKeyword?: string): Chainable<void>;

      /**
       * Verifies that shopping cart page is visible.
       */
      shouldSeeShoppingCartPage(): Chainable<void>;

      /**
       * Verifies that product is visible in shopping cart.
       */
      shouldSeeProductInCart(productName: string): Chainable<void>;

      /**
       * Verifies product quantity in shopping cart.
       */
      shouldSeeProductQuantityInCart(productName: string, quantity: number): Chainable<void>;

      /**
       * Verifies that product total price equals unit price multiplied by quantity.
       */
      shouldSeeCorrectProductTotalInCart(productName: string): Chainable<void>;
    }
  }
}

export {};
