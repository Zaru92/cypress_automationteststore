import { setAllureMetadata } from '../../support/allure';
import {
  expectProductSearchHandledWithoutServerError,
  expectProductSearchWithoutKnownProductResponse,
} from '../../api/validators/product-response.validator';
import { productSearchCriteria } from '../../test-data/static/test-search-criteria';

describe('Products API Negative Scenarios', { tags: ['@api', '@negative', '@regression'] }, () => {
  it('should not return known product for non-existing search keyword', () => {
    setAllureMetadata({
      epic: 'API / HTTP Routes',
      feature: 'Product Routes',
      story: 'Search route handles non-existing product keyword',
      severity: 'normal',
      tags: ['api', 'negative', 'regression'],
    });

    const searchCriteria = productSearchCriteria.noResults;

    cy.apiSearchProducts(searchCriteria.keyword).then((response) => {
      expectProductSearchWithoutKnownProductResponse(response);
    });
  });

  it('should handle special characters in search keyword without server error', () => {
    setAllureMetadata({
      epic: 'API / HTTP Routes',
      feature: 'Product Routes',
      story: 'Search route handles special characters',
      severity: 'normal',
      tags: ['api', 'negative', 'regression'],
    });

    const searchCriteria = productSearchCriteria.specialCharacters;

    cy.apiSearchProducts(searchCriteria.keyword).then((response) => {
      expectProductSearchHandledWithoutServerError(response);
    });
  });
});
