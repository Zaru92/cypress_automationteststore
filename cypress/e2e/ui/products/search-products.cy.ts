import { setAllureMetadata } from '../../../support/allure';
import { buildProductSearchData } from '../../../test-data/factories/product-search.factory';

describe('Product Search', { tags: ['@ui', '@smoke'] }, () => {
  it('should display products matching search phrase', () => {
    setAllureMetadata({
      epic: 'E-commerce',
      feature: 'Product Search',
      story: 'Search products by keyword',
      severity: 'critical',
      tags: ['ui', 'smoke'],
    });

    const { keyword } = buildProductSearchData();

    cy.openHomePage();

    cy.searchProduct(keyword);

    cy.shouldSeeSearchResults(keyword);
  });
});
