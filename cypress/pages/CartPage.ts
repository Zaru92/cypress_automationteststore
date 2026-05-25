import { BasePage } from './BasePage';
import { cartSelectors } from '../selectors/cart.selectors';

class CartPage extends BasePage {
  assertLoaded(): void {
    cy.location('href').should('include', 'checkout/cart');

    this.shouldBeVisible(cartSelectors.cartHeading);
    this.getElement(cartSelectors.cartHeading).should('contain.text', 'Shopping Cart');
  }

  shouldContainProduct(productName: string): void {
    cy.contains(cartSelectors.cartContentPanel, productName).should('be.visible');
  }
}

export const cartPage = new CartPage();
