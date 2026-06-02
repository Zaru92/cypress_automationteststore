import { BasePage } from './BasePage';
import { checkoutSelectors } from '../selectors/checkout.selectors';

class CheckoutPage extends BasePage {
  shouldSeeCheckoutPage(): void {
    cy.location('href').should('include', 'checkout/confirm');

    this.shouldBeVisible(checkoutSelectors.checkoutHeading);
    this.getElement(checkoutSelectors.checkoutHeading).should('contain.text', 'Checkout');
  }

  confirmCheckout(): void {
    this.clickElement(checkoutSelectors.confirmCheckoutButton);
  }

  shouldSeeOrderConfirmationPage(): void {
    cy.location('href').should('include', 'checkout/success');

    this.shouldBeVisible(checkoutSelectors.checkoutHeading);
    this.getElement(checkoutSelectors.checkoutHeading).should(
      'contain.text',
      'Your Order Has Been Processed!',
    );
  }
}

export const checkoutPage = new CheckoutPage();
