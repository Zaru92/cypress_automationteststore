import { BasePage } from './BasePage';
import { authSelectors } from '../selectors/auth.selectors';
import type { LoginCredentials } from '../types/user.types';
import { commonSelectors } from '../selectors/common.selectors';

class LoginPage extends BasePage {
  open(): void {
    this.visit('/index.php?rt=account/login');
  }

  assertLoaded(): void {
    cy.location('href').should('include', 'account/login');

    this.shouldBeVisible(authSelectors.loginForm);
    this.shouldBeVisible(authSelectors.loginNameInput);
    this.shouldBeVisible(authSelectors.passwordInput);
    this.shouldBeVisible(authSelectors.loginButton);
  }

  loginWithCredentials(credentials: LoginCredentials): void {
    this.clearAndType(authSelectors.loginNameInput, credentials.loginName);
    this.clearAndType(authSelectors.passwordInput, credentials.password);
    this.clickElement(authSelectors.loginButton);
  }

  shouldDisplayLoginError(): void {
    this.shouldBeVisible(authSelectors.loginErrorAlert);
    this.getElement(authSelectors.loginErrorAlert).should('contain.text', 'Error');
  }

  assertLogin(firstName: string): void {
    cy.location('href').should('include', 'account/account');

    this.shouldBeVisible(commonSelectors.heading);
    this.getElement(commonSelectors.heading).should('contain.text', 'My Account');
    this.getElement(authSelectors.username).should('contain.text', firstName);
  }

  logout(): void {
    this.clickElement(authSelectors.logoffButton);
  }

  assertLogout(firstName: string): void {
    cy.location('href').should('include', 'account/logout');

    this.shouldBeVisible(commonSelectors.heading);
    this.getElement(authSelectors.logoutMessage).should(
      'contain.text',
      'You have been logged off your account. It is now safe to leave the computer.',
    );
    this.getElement(authSelectors.loginPageTopBarButton).should('not.contain.text', firstName);
  }
}

export const loginPage = new LoginPage();
