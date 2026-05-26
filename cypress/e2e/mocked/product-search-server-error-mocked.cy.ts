import { productSearchCriteria } from '../../test-data/static/test-search-criteria';

describe('Mocked Product Search Server Error @mocked @ui @negative @regression', () => {
  it('should display error message when product search returns server error', () => {
    const searchCriteria = productSearchCriteria.mockedServerError;

    cy.mockProductSearchServerErrorResponse(searchCriteria.keyword);

    cy.openHomePage();
    cy.searchProduct(searchCriteria.keyword);

    cy.shouldSeeProductSearchServerErrorMessage();
  });
});
