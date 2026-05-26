import { negativeEndpoints } from '../endpoints/negative.endpoints';
import type { HtmlApiResponse } from '../../types/api.types';

class NegativeApiClient {
  getNotExistingPage(): Cypress.Chainable<HtmlApiResponse> {
    return cy.request<string>({
      method: 'GET',
      url: negativeEndpoints.notExistingPage,
      failOnStatusCode: false,
    });
  }
}

export const negativeApiClient = new NegativeApiClient();
