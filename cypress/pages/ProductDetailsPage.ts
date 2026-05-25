import { BasePage } from './BasePage';
import { productDetailsSelectors } from '../selectors/productDetails.selectors';

class ProductDetailsPage extends BasePage {
  assertLoaded(): void {
    cy.location('href').should('include', 'product/product');

    this.shouldBeVisible(productDetailsSelectors.productTitle);
    this.shouldBeVisible(productDetailsSelectors.productPrice);
    this.shouldBeVisible(productDetailsSelectors.quantityInput);
    this.shouldBeVisible(productDetailsSelectors.addToCartButton);
  }

  shouldDisplayProductTitle(expectedTitle: string): void {
    this.getElement(productDetailsSelectors.productTitle)
      .should('be.visible')
      .invoke('text')
      .should((title) => {
        expect(title.trim()).to.eq(expectedTitle);
      });
  }

  addCurrentProductToCart(): void {
    this.clickElement(productDetailsSelectors.addToCartButton);
  }
}

export const productDetailsPage = new ProductDetailsPage();
