import { registerPage } from '../../pages/RegisterPage';
import type { RegistrationData } from '../../types/user.types';

export const openRegisterPageFlow = (): void => {
  registerPage.open();
};

export const verifyRegisterPageIsVisibleFlow = (): void => {
  registerPage.assertLoaded();
};

export const registerUserFlow = (data: RegistrationData): void => {
  registerPage.fillRegistration(data);
  registerPage.submit();
};

export const verifyAccountCreatedFlow = (): void => {
  registerPage.assertAccountCreated();
};
