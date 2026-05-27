import { expectShoppingCartResponse } from '../../api/validators/cart-response.validator';

describe('Cart API / HTTP Routes', { tags: ['@api', '@regression'] }, () => {
  it('should return shopping cart page', () => {
    cy.apiGetCart().then((response) => {
      expectShoppingCartResponse(response);
    });
  });
});
