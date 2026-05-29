import {
  loginWithCredentialsFlow,
  openLoginPageFlow,
  verifyLoginErrorFlow,
  verifyLoginPageIsVisibleFlow,
  verifyUserIsLoggedInFlow,
  logoutFlow,
  verifyUserIsLoggedOutFlow,
} from '../../flows/auth/login.flow';
import {
  openRegisterPageFlow,
  registerUserFlow,
  verifyAccountCreatedFlow,
  verifyRegisterPageIsVisibleFlow,
} from '../../flows/auth/register.flow';
import type { LoginCredentials, RegistrationData } from '../../types/user.types';
import { logStep } from '../log';

Cypress.Commands.add('openLoginPage', () => {
  logStep('openLoginPage', 'Open login page');
  openLoginPageFlow();
});

Cypress.Commands.add('shouldSeeLoginPage', () => {
  logStep('shouldSeeLoginPage', 'Verify login page is visible');
  verifyLoginPageIsVisibleFlow();
});

Cypress.Commands.add('loginWithCredentials', (credentials: LoginCredentials) => {
  logStep('loginWithCredentials', `Login with user: ${credentials.loginName}`);
  loginWithCredentialsFlow(credentials);
});

Cypress.Commands.add('shouldSeeLoginError', () => {
  logStep('shouldSeeLoginError', 'Verify login error is visible');
  verifyLoginErrorFlow();
});

Cypress.Commands.add('openRegisterPage', () => {
  logStep('openRegisterPage', 'Open register page');
  openRegisterPageFlow();
});

Cypress.Commands.add('shouldSeeRegisterPage', () => {
  logStep('shouldSeeRegisterPage', 'Verify register page is visible');
  verifyRegisterPageIsVisibleFlow();
});

Cypress.Commands.add('registerUser', (data: RegistrationData) => {
  logStep('registerUser', `Register user: ${data.loginName}`);
  registerUserFlow(data);
});

Cypress.Commands.add('shouldSeeAccountCreated', () => {
  logStep('shouldSeeAccountCreated', 'Verify account created confirmation is visible');
  verifyAccountCreatedFlow();
});

Cypress.Commands.add('shouldSeeLoggedInUser', (firstName: string) => {
  logStep('shouldSeeLoggedInUser', `Verify user is logged in as: ${firstName}`);
  verifyUserIsLoggedInFlow(firstName);
});

Cypress.Commands.add('logoutUser', () => {
  logStep('logOutUser', `Log out user`);
  logoutFlow();
});

Cypress.Commands.add('shouldSeeUserIsLoggedOut', (firstName: string) => {
  logStep('shouldSeeLoggedOutMessage', `Verify user ${firstName} is logged out`);
  verifyUserIsLoggedOutFlow(firstName);
});
