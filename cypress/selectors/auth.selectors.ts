export const authSelectors = {
  loginForm: '#loginFrm',
  loginNameInput: '#loginFrm_loginname',
  passwordInput: '#loginFrm_password',
  loginButton: 'button[title="Login"], #loginFrm button[type="submit"]',
  loginErrorAlert: '.alert-error, .alert-danger, .alert',
} as const;
