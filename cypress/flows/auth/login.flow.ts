import { loginPage } from '../../pages/LoginPage';
import type { LoginCredentials } from '../../types/user.types';

export const openLoginPageFlow = (): void => {
  loginPage.open();
};

export const verifyLoginPageIsVisibleFlow = (): void => {
  loginPage.assertLoaded();
};

export const loginWithCredentialsFlow = (credentials: LoginCredentials): void => {
  loginPage.loginWithCredentials(credentials);
};

export const verifyLoginErrorFlow = (): void => {
  loginPage.shouldDisplayLoginError();
};
