import {
  openShoppingCartFlow,
  verifyCheckoutButtonIsNotVisibleFlow,
  verifyEmptyShoppingCartFlow,
} from '../../flows/checkout/empty-cart-checkout.flow';
import {
  confirmCheckoutFlow,
  verifyCheckoutPageFlow,
  verifyOrderConfirmationPageFlow,
} from '../../flows/checkout/proceed-checkout.flow';
import { logStep } from '../log';

Cypress.Commands.add('openShoppingCart', () => {
  logStep('openShoppingCart', 'Open shopping cart page');
  openShoppingCartFlow();
});

Cypress.Commands.add('shouldSeeEmptyShoppingCart', () => {
  logStep('shouldSeeEmptyShoppingCart', 'Verify shopping cart is empty');
  verifyEmptyShoppingCartFlow();
});

Cypress.Commands.add('shouldNotSeeCheckoutButton', () => {
  logStep('shouldNotSeeCheckoutButton', 'Verify checkout button is not visible');
  verifyCheckoutButtonIsNotVisibleFlow();
});

Cypress.Commands.add('shouldSeeCheckoutPage', () => {
  logStep('shouldSeeCheckoutPage', 'Verify checkout page is visible');
  verifyCheckoutPageFlow();
});

Cypress.Commands.add('confirmCheckout', () => {
  logStep('confirmCheckout', 'Confirm checkout');
  confirmCheckoutFlow();
});

Cypress.Commands.add('shouldSeeOrderConfirmationPage', () => {
  logStep('shouldSeeOrderConfirmationPage', 'Verify order confirmation page is visible');
  verifyOrderConfirmationPageFlow();
});
