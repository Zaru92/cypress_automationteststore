import {
  deleteProductFromCartFlow,
  verifyProductIsDeletedFromCartFlow,
} from '../../flows/cart/delete-product-from-cart.flow';
import {
  addProductToCartFlow,
  verifyCorrectProductTotalInCartFlow,
  verifyProductInCartFlow,
  verifyProductQuantityInCartFlow,
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

Cypress.Commands.add('shouldSeeProductQuantityInCart', (productName: string, quantity: number) => {
  logStep(
    'shouldSeeProductQuantityInCart',
    `Verify product quantity in cart: ${productName}, quantity: ${quantity}`,
  );
  verifyProductQuantityInCartFlow(productName, quantity);
});

Cypress.Commands.add('shouldSeeCorrectProductTotalInCart', (productName: string) => {
  logStep('shouldSeeCorrectProductTotalInCart', `Verify product total in cart: ${productName}`);
  verifyCorrectProductTotalInCartFlow(productName);
});

Cypress.Commands.add('deleteProductFromCart', (productName: string) => {
  logStep('deleteProductFromCart', `Delete product from cart: ${productName}`);
  deleteProductFromCartFlow(productName);
});

Cypress.Commands.add('shouldNotSeeProductInCart', (productName: string) => {
  logStep('shouldNotSeeProductInCart', `Verify product is not visible in cart: ${productName}`);
  verifyProductIsDeletedFromCartFlow(productName);
});
