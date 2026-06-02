import { cartPage } from '../../pages/CartPage';
import { checkoutPage } from '../../pages/CheckoutPage';

export const proceedToCheckoutFlow = (): void => {
  cartPage.proceedToCheckout();
};

export const verifyCheckoutPageFlow = (): void => {
  checkoutPage.shouldSeeCheckoutPage();
};

export const confirmCheckoutFlow = (): void => {
  checkoutPage.confirmCheckout();
};

export const verifyOrderConfirmationPageFlow = (): void => {
  checkoutPage.shouldSeeOrderConfirmationPage();
};
