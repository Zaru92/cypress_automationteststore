import { setAllureMetadata } from '../../support/allure';
import { expectShoppingCartResponse } from '../../api/validators/cart-response.validator';

describe('Cart API / HTTP Routes', { tags: ['@api', '@regression'] }, () => {
  it('should return shopping cart page', () => {
    setAllureMetadata({
      epic: 'API / HTTP Routes',
      feature: 'Cart Routes',
      story: 'Shopping cart route returns valid HTML page',
      severity: 'normal',
      tags: ['api', 'regression'],
    });

    cy.apiGetCart().then((response) => {
      expectShoppingCartResponse(response);
    });
  });
});
