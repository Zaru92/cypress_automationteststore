import { buildProductSearchData } from '@test-data/factories/product-search.factory';

describe('Product Search @ui @smoke', () => {
  it('should display products matching search phrase', () => {
    const { keyword } = buildProductSearchData();

    cy.openHomePage();

    cy.searchProduct(keyword);

    cy.shouldSeeSearchResults(keyword);
  });
});
