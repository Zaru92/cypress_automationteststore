import { expectProductSearchResultsResponse } from '../../api/validators/product-response.validator';
import { testProducts } from '../../test-data/static/test-products';

describe('Products API / HTTP Routes @api @smoke', () => {
  it('should return product search results page for valid keyword', () => {
    const product = testProducts.curlsToStraightShampoo;

    cy.apiSearchProducts(product.searchKeyword).then((response) => {
      expectProductSearchResultsResponse(response, product.name);
    });
  });
});
