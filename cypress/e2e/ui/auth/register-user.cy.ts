import { setAllureMetadata } from '../../../support/allure';
import { buildRegistrationData } from '../../../test-data/factories/user-registration.factory';

describe('User Registration', { tags: ['@ui', '@smoke'] }, () => {
  let firstName: string;

  after(() => {
    cy.openLoginPage();
    cy.logoutUser();
    cy.shouldSeeUserIsLoggedOut(firstName);
  });

  it('should register a new user with valid data', () => {
    setAllureMetadata({
      epic: 'Authentication',
      feature: 'Registration',
      story: 'Successful registration',
      severity: 'critical',
      tags: ['ui', 'smoke'],
    });

    const registrationData = buildRegistrationData();

    cy.openRegisterPage();
    cy.shouldSeeRegisterPage();

    cy.registerUser(registrationData);

    cy.shouldSeeAccountCreated();

    firstName = registrationData.firstName;
  });
});
