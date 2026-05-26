import { expectProductSearchWithoutKnownProductResponse } from '../../api/validators/product-response.validator';
import { productSearchCriteria } from '../../test-data/static/test-search-criteria';
import { testProducts } from '../../test-data/static/test-products';

describe('Products API Negative Scenarios @api @negative @regression', () => {
  it('should not return known product for non-existing search keyword', () => {
    const knownProduct = testProducts.curlsToStraightShampoo;
    const searchCriteria = productSearchCriteria.noResults;

    cy.apiSearchProducts(searchCriteria.keyword).then((response) => {
      expectProductSearchWithoutKnownProductResponse(response, knownProduct.name);
    });
  });

  it('should handle special characters in search keyword without server error', () => {
    const knownProduct = testProducts.curlsToStraightShampoo;
    const searchCriteria = productSearchCriteria.specialCharacters;

    cy.apiSearchProducts(searchCriteria.keyword).then((response) => {
      expectProductSearchWithoutKnownProductResponse(response, knownProduct.name);
    });
  });
});
