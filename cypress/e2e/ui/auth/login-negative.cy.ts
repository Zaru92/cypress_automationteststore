import { setAllureMetadata } from '../../../support/allure';
import { invalidUsers } from '../../../test-data/static/test-users';

describe('Login Negative Scenarios', { tags: ['@ui', '@negative', '@smoke'] }, () => {
  it('should display error message for invalid login credentials', () => {
    setAllureMetadata({
      epic: 'Authentication',
      feature: 'Login',
      story: 'Invalid login credentials',
      severity: 'critical',
      tags: ['ui', 'negative', 'smoke'],
    });

    const credentials = invalidUsers.invalidLogin;

    cy.openLoginPage();
    cy.shouldSeeLoginPage();

    cy.loginWithCredentials(credentials);

    cy.shouldSeeLoginError();
  });
});
