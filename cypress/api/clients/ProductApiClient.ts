import { productEndpoints } from '../endpoints/product.endpoints';
import type { HtmlApiResponse } from '../../types/api.types';

class ProductApiClient {
  searchProducts(keyword: string): Cypress.Chainable<HtmlApiResponse> {
    return cy.request<string>({
      method: 'GET',
      url: productEndpoints.search(keyword),
      failOnStatusCode: false,
    });
  }
}

export const productApiClient = new ProductApiClient();
