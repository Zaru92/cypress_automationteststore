import {
  addProductToCartFlow,
  verifyProductInCartFlow,
  verifyShoppingCartPageFlow,
} from '../../flows/cart/add-product-to-cart.flow';
import { logStep } from '../log';

Cypress.Commands.add('addProductToCart', (productName: string, searchKeyword?: string) => {
  logStep('addProductToCart', `Add product to cart: ${productName}`);
  addProductToCartFlow(productName, searchKeyword);
});

Cypress.Commands.add('shouldSeeShoppingCartPage', () => {
  logStep('shouldSeeShoppingCartPage', 'Verify shopping cart page is visible');
  verifyShoppingCartPageFlow();
});

Cypress.Commands.add('shouldSeeProductInCart', (productName: string) => {
  logStep('shouldSeeProductInCart', `Verify product is visible in cart: ${productName}`);
  verifyProductInCartFlow(productName);
});
