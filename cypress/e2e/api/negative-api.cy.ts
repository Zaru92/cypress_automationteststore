import { expectNotFoundResponse } from '../../api/validators/http-response.validator';

describe('Negative API / HTTP Routes @api @negative @regression', () => {
  it('should return not found status for not existing page', () => {
    cy.apiGetNotExistingPage().then((response) => {
      expectNotFoundResponse(response);
    });
  });
});
