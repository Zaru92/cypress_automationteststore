import { testProducts } from '../../../test-data/static/test-products';

describe('Shopping Cart @ui @smoke', () => {
  it('should add selected product to cart', () => {
    const product = testProducts.curlsToStraightShampoo;

    cy.openHomePage();

    cy.addProductToCart(product.name, product.searchKeyword);

    cy.shouldSeeShoppingCartPage();
    cy.shouldSeeProductInCart(product.name);
  });
});
