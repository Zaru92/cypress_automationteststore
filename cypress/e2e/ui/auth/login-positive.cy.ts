import { setAllureMetadata } from '../../../support/allure';
import { buildRegistrationData } from '../../../test-data/factories/user-registration.factory';
import type { LoginCredentials } from '../../../types/user.types';

describe('Login Positive Scenarios', { tags: ['@ui', '@smoke'] }, () => {
  let credentials: LoginCredentials;
  let firstName: string;

  before(() => {
    const registrationData = buildRegistrationData();

    cy.openRegisterPage();
    cy.shouldSeeRegisterPage();

    cy.registerUser(registrationData);

    cy.shouldSeeAccountCreated();

    credentials = { loginName: registrationData.loginName, password: registrationData.password };
    firstName = registrationData.firstName;

    cy.openLoginPage();
    cy.logoutUser();
    cy.shouldSeeUserIsLoggedOut(firstName);
  });

  after(() => {
    cy.openLoginPage();
    cy.logoutUser();
    cy.shouldSeeUserIsLoggedOut(firstName);
  });

  it('should login user with valid data', () => {
    setAllureMetadata({
      epic: 'Authentication',
      feature: 'Login',
      story: 'Successful login',
      severity: 'critical',
      tags: ['ui', 'smoke'],
    });

    cy.openLoginPage();
    cy.shouldSeeLoginPage();

    cy.loginWithCredentials(credentials);

    cy.shouldSeeLoggedInUser(firstName);
  });
});
