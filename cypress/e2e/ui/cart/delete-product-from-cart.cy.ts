import { setAllureMetadata } from '../../../support/allure';
import { testProducts } from '../../../test-data/static/test-products';

describe('Shopping Cart', { tags: ['@ui', '@regression'] }, () => {
  const product = testProducts.curlsToStraightShampoo;

  beforeEach(() => {
    cy.openHomePage();

    cy.addProductToCart(product.name, product.searchKeyword);

    cy.shouldSeeShoppingCartPage();
    cy.shouldSeeProductInCart(product.name);
  });

  it('should delete selected product from cart', () => {
    setAllureMetadata({
      epic: 'E-commerce',
      feature: 'Shopping Cart',
      story: 'Delete product from cart',
      severity: 'normal',
      tags: ['ui', 'regression'],
    });

    cy.openShoppingCart();

    cy.shouldSeeProductInCart(product.name);

    cy.deleteProductFromCart(product.name);

    cy.shouldSeeShoppingCartPage();
    cy.shouldNotSeeProductInCart(product.name);
  });
});
