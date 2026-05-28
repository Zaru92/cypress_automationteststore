import { BasePage } from './BasePage';
import { registerSelectors } from '../selectors/register.selectors';
import type { RegistrationData } from '../types/user.types';

class RegisterPage extends BasePage {
  open(): void {
    this.visit('/index.php?rt=account/create');
  }

  assertLoaded(): void {
    cy.location('href').should('include', 'account/create');

    this.shouldBeVisible(registerSelectors.form);
    this.shouldBeVisible(registerSelectors.firstNameInput);
    this.shouldBeVisible(registerSelectors.emailInput);
    this.shouldBeVisible(registerSelectors.loginNameInput);
    this.shouldBeVisible(registerSelectors.continueButton);
  }

  fillRegistration(data: RegistrationData): void {
    this.clearAndType(registerSelectors.firstNameInput, data.firstName);
    this.clearAndType(registerSelectors.lastNameInput, data.lastName);
    this.clearAndType(registerSelectors.emailInput, data.email);
    this.clearAndType(registerSelectors.telephoneInput, data.telephone);
    this.clearAndType(registerSelectors.address1Input, data.address1);
    this.clearAndType(registerSelectors.cityInput, data.city);

    this.getElement(registerSelectors.countrySelect).select(data.country);
    this.getElement(registerSelectors.zoneSelect)
      .find('option')
      .should('have.length.greaterThan', 1);
    this.getElement(registerSelectors.zoneSelect).select(data.zone);

    this.clearAndType(registerSelectors.postcodeInput, data.postcode);
    this.clearAndType(registerSelectors.loginNameInput, data.loginName);
    this.clearAndType(registerSelectors.passwordInput, data.password);
    this.clearAndType(registerSelectors.confirmPasswordInput, data.confirmPassword);

    this.getElement(registerSelectors.privacyPolicyCheckbox).check();
  }

  submit(): void {
    this.clickElement(registerSelectors.continueButton);
  }

  assertAccountCreated(): void {
    cy.location('href').should('include', 'account/success');

    this.shouldBeVisible(registerSelectors.accountCreatedHeading);
    this.getElement(registerSelectors.accountCreatedHeading).should(
      'contain.text',
      'Your Account Has Been Created',
    );
  }
}

export const registerPage = new RegisterPage();
