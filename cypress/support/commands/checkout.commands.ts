import {
  openShoppingCartFlow,
  verifyCheckoutButtonIsNotVisibleFlow,
  verifyEmptyShoppingCartFlow,
} from '../../flows/checkout/empty-cart-checkout.flow';
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
