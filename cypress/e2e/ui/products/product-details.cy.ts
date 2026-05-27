import { setAllureMetadata } from '../../../support/allure';
import { buildProductSearchData } from '../../../test-data/factories/product-search.factory';

describe('Product Details', { tags: ['@ui', '@regression'] }, () => {
  it('should open product details page from search results', () => {
    setAllureMetadata({
      epic: 'E-commerce',
      feature: 'Product Details',
      story: 'Open product details from search results',
      severity: 'normal',
      tags: ['ui', 'regression'],
    });

    const { keyword } = buildProductSearchData();

    cy.openHomePage();

    cy.searchProduct(keyword);
    cy.shouldSeeSearchResults(keyword);

    cy.openFirstProductFromSearchResults();

    cy.shouldSeeProductDetailsPage();
  });
});
