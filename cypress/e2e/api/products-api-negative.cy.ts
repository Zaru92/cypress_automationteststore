import {
  expectProductSearchHandledWithoutServerError,
  expectProductSearchWithoutKnownProductResponse,
} from '../../api/validators/product-response.validator';
import { productSearchCriteria } from '../../test-data/static/test-search-criteria';

describe('Products API Negative Scenarios', { tags: ['@api', '@negative', '@regression'] }, () => {
  it('should not return known product for non-existing search keyword', () => {
    const searchCriteria = productSearchCriteria.noResults;

    cy.apiSearchProducts(searchCriteria.keyword).then((response) => {
      expectProductSearchWithoutKnownProductResponse(response);
    });
  });

  it('should handle special characters in search keyword without server error', () => {
    const searchCriteria = productSearchCriteria.specialCharacters;

    cy.apiSearchProducts(searchCriteria.keyword).then((response) => {
      expectProductSearchHandledWithoutServerError(response);
    });
  });
});
