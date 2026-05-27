import { productSearchCriteria } from '../../test-data/static/test-search-criteria';

describe('Mocked Product Search', { tags: ['@mocked', '@ui', '@regression'] }, () => {
  it('should display empty state when product search returns no results', () => {
    const searchCriteria = productSearchCriteria.mockedEmptyResults;

    cy.mockEmptyProductSearchResponse(searchCriteria.keyword);

    cy.openHomePage();
    cy.searchProduct(searchCriteria.keyword);

    cy.shouldSeeNoSearchResultsMessage();
  });
});
