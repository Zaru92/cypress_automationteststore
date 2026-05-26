import {
  loginWithCredentialsFlow,
  openLoginPageFlow,
  verifyLoginErrorFlow,
  verifyLoginPageIsVisibleFlow,
} from '../../flows/auth/login.flow';
import type { LoginCredentials } from '../../types/user.types';
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
