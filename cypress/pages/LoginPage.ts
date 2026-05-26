import { BasePage } from './BasePage';
import { authSelectors } from '../selectors/auth.selectors';
import type { LoginCredentials } from '../types/user.types';

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
}

export const loginPage = new LoginPage();
