import { invalidUsers } from '../../../test-data/static/test-users';

describe('Login Negative Scenarios', { tags: ['@ui', '@negative', '@smoke'] }, () => {
  it('should display error message for invalid login credentials', () => {
    const credentials = invalidUsers.invalidLogin;

    cy.openLoginPage();
    cy.shouldSeeLoginPage();

    cy.loginWithCredentials(credentials);

    cy.shouldSeeLoginError();
  });
});
