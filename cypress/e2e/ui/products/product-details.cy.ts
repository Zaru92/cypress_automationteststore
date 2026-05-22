import { buildProductSearchData } from '@test-data/factories/product-search.factory';

describe('Product Details @ui @regression', () => {
  it('should open product details page from search results', () => {
    const { keyword } = buildProductSearchData();

    cy.openHomePage();

    cy.searchProduct(keyword);
    cy.shouldSeeSearchResults(keyword);

    cy.openFirstProductFromSearchResults();

    cy.shouldSeeProductDetailsPage();
  });
});
