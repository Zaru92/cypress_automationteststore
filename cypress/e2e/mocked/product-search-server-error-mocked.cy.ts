import { setAllureMetadata } from '../../support/allure';
import { productSearchCriteria } from '../../test-data/static/test-search-criteria';

describe('Mocked Product Search Server Error @mocked @ui @negative @regression', () => {
  it('should display error message when product search returns server error', () => {
    setAllureMetadata({
      epic: 'Mocked UI States',
      feature: 'Error Handling',
      story: 'Display error message for product search server error',
      severity: 'critical',
      tags: ['mocked', 'ui', 'negative', 'regression'],
    });

    const searchCriteria = productSearchCriteria.mockedServerError;

    cy.mockProductSearchServerErrorResponse(searchCriteria.keyword);

    cy.openHomePage();
    cy.searchProduct(searchCriteria.keyword);

    cy.shouldSeeProductSearchServerErrorMessage();
  });
});
