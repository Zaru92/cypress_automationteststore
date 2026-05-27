import { setAllureMetadata } from '../../support/allure';
import { expectProductSearchResultsResponse } from '../../api/validators/product-response.validator';
import { testProducts } from '../../test-data/static/test-products';

describe('Products API / HTTP Routes', { tags: ['@api', '@smoke'] }, () => {
  it('should return product search results page for valid keyword', () => {
    setAllureMetadata({
      epic: 'API / HTTP Routes',
      feature: 'Product Routes',
      story: 'Search products route returns valid HTML results',
      severity: 'critical',
      tags: ['api', 'smoke'],
    });

    const product = testProducts.curlsToStraightShampoo;

    cy.apiSearchProducts(product.searchKeyword).then((response) => {
      expectProductSearchResultsResponse(response, product.name);
    });
  });
});
