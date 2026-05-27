import { setAllureMetadata } from '../../../support/allure';
import { testProducts } from '../../../test-data/static/test-products';

describe('Shopping Cart Summary', { tags: ['@ui', '@regression'] }, () => {
  it('should display correct quantity and total for added product', () => {
    setAllureMetadata({
      epic: 'E-commerce',
      feature: 'Shopping Cart',
      story: 'Validate cart quantity and total price',
      severity: 'normal',
      tags: ['ui', 'regression'],
    });

    const product = testProducts.curlsToStraightShampoo;

    cy.openHomePage();

    cy.addProductToCart(product.name, product.searchKeyword);

    cy.shouldSeeShoppingCartPage();
    cy.shouldSeeProductInCart(product.name);
    cy.shouldSeeProductQuantityInCart(product.name, 1);
    cy.shouldSeeCorrectProductTotalInCart(product.name);
  });
});
