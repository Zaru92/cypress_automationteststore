export const authSelectors = {
  loginForm: '#loginFrm',
  loginNameInput: '#loginFrm_loginname',
  passwordInput: '#loginFrm_password',
  loginButton: 'button[title="Login"], #loginFrm button[type="submit"]',
  loginErrorAlert: '.alert-error, .alert-danger, .alert',
  username: '.subtext',
  loginPageTopBarButton: '#customer_menu_top',
  logoffButton: 'a[data-original-title="Logoff"]',
  logoutMessage: '.contentpanel',
} as const;
