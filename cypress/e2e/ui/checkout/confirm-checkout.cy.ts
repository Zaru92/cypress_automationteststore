import { setAllureMetadata } from '../../../support/allure';
import { buildRegistrationData } from '../../../test-data/factories/user-registration.factory';
import type { LoginCredentials } from '../../../types/user.types';
import { testProducts } from '../../../test-data/static/test-products';

describe('Checkout Positive Scenarios', { tags: ['@ui', '@regression'] }, () => {
  let credentials: LoginCredentials;
  let firstName: string;

  beforeEach(() => {
    const registrationData = buildRegistrationData();

    cy.openRegisterPage();
    cy.shouldSeeRegisterPage();

    cy.registerUser(registrationData);

    cy.shouldSeeAccountCreated();

    credentials = { loginName: registrationData.loginName, password: registrationData.password };
    firstName = registrationData.firstName;

    cy.openLoginPage();
    cy.logoutUser();
    cy.shouldSeeUserIsLoggedOut(firstName);
  });

  after(() => {
    cy.openLoginPage();
    cy.logoutUser();
    cy.shouldSeeUserIsLoggedOut(firstName);
  });

  it('should confirm checkout and process the order', () => {
    setAllureMetadata({
      epic: 'Checkout',
      feature: 'Checkout',
      story: 'Confirm checkout and process order',
      severity: 'critical',
      tags: ['ui', 'regression'],
    });

    const product = testProducts.curlsToStraightShampoo;

    cy.openHomePage();

    cy.addProductToCart(product.name, product.searchKeyword);

    cy.shouldSeeShoppingCartPage();
    cy.shouldSeeProductInCart(product.name);

    cy.proceedToCheckout();

    cy.loginWithCredentials(credentials);

    cy.shouldSeeCheckoutPage();

    cy.confirmCheckout();

    cy.shouldSeeOrderConfirmationPage();
  });
});
