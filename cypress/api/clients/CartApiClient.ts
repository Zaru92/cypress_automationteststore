import { cartEndpoints } from '../endpoints/cart.endpoints';
import type { HtmlApiResponse } from '../../types/api.types';

class CartApiClient {
  getCart(): Cypress.Chainable<HtmlApiResponse> {
    return cy.request<string>({
      method: 'GET',
      url: cartEndpoints.cart,
      failOnStatusCode: false,
    });
  }
}

export const cartApiClient = new CartApiClient();
