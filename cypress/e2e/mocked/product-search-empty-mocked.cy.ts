import { setAllureMetadata } from '../../support/allure';
import { productSearchCriteria } from '../../test-data/static/test-search-criteria';

describe('Mocked Product Search', { tags: ['@mocked', '@ui', '@regression'] }, () => {
  it('should display empty state when product search returns no results', () => {
    setAllureMetadata({
      epic: 'Mocked UI States',
      feature: 'Product Search Mocking',
      story: 'Display empty state for empty product search response',
      severity: 'normal',
      tags: ['mocked', 'ui', 'regression'],
    });

    const searchCriteria = productSearchCriteria.mockedEmptyResults;

    cy.mockEmptyProductSearchResponse(searchCriteria.keyword);

    cy.openHomePage();
    cy.searchProduct(searchCriteria.keyword);

    cy.shouldSeeNoSearchResultsMessage();
  });
});
