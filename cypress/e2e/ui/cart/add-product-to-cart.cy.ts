import { setAllureMetadata } from '../../../support/allure';
import { testProducts } from '../../../test-data/static/test-products';

describe('Shopping Cart', { tags: ['@ui', '@smoke'] }, () => {
  it('should add selected product to cart', () => {
    setAllureMetadata({
      epic: 'E-commerce',
      feature: 'Shopping Cart',
      story: 'Add product to cart',
      severity: 'critical',
      tags: ['ui', 'smoke'],
    });

    const product = testProducts.curlsToStraightShampoo;

    cy.openHomePage();

    cy.addProductToCart(product.name, product.searchKeyword);

    cy.shouldSeeShoppingCartPage();
    cy.shouldSeeProductInCart(product.name);
  });
});
