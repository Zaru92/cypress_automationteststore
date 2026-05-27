import { setAllureMetadata } from '../../support/allure';
import { expectNotFoundResponse } from '../../api/validators/http-response.validator';

describe('Negative API / HTTP Routes', { tags: ['@api', '@negative', '@regression'] }, () => {
  it('should return not found status for not existing page', () => {
    setAllureMetadata({
      epic: 'API / HTTP Routes',
      feature: 'Error Handling',
      story: 'Not existing route returns not found status',
      severity: 'normal',
      tags: ['api', 'negative', 'regression'],
    });

    cy.apiGetNotExistingPage().then((response) => {
      expectNotFoundResponse(response);
    });
  });
});
