import { testProducts } from '../../../test-data/static/test-products';

describe('Shopping Cart Summary', { tags: ['@ui', '@regression'] }, () => {
  it('should display correct quantity and total for added product', () => {
    const product = testProducts.curlsToStraightShampoo;

    cy.openHomePage();

    cy.addProductToCart(product.name, product.searchKeyword);

    cy.shouldSeeShoppingCartPage();
    cy.shouldSeeProductInCart(product.name);
    cy.shouldSeeProductQuantityInCart(product.name, 1);
    cy.shouldSeeCorrectProductTotalInCart(product.name);
  });
});
