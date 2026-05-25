import { BasePage } from './BasePage';
import { cartSelectors } from '../selectors/cart.selectors';
import { extractMoneyValues } from '../utils/money';
import { exactTextPattern } from '../utils/text';

class CartPage extends BasePage {
  assertLoaded(): void {
    cy.location('href').should('include', 'checkout/cart');

    this.shouldBeVisible(cartSelectors.cartHeading);
    this.getElement(cartSelectors.cartHeading).should('contain.text', 'Shopping Cart');
  }

  shouldContainProduct(productName: string): void {
    this.getElement(cartSelectors.cartProductLinks).should(($links) => {
      const exactMatch = [...$links].some((link) => link.textContent?.trim() === productName);
      expect(exactMatch, `cart should contain "${productName}"`).to.equal(true);
    });
  }

  shouldHaveProductQuantity(productName: string, expectedQuantity: number): void {
    this.getProductRow(productName).within(() => {
      this.getElement(cartSelectors.productQuantityInput).should(
        'have.value',
        expectedQuantity.toString(),
      );
    });
  }

  shouldHaveCorrectProductTotal(productName: string): void {
    this.getProductRow(productName).then(($row) => {
      const rawQuantity = $row.find(cartSelectors.productQuantityInput).val();
      const quantity = Number(rawQuantity);
      const moneyValues = extractMoneyValues($row.text());

      expect(quantity, 'cart product quantity').to.be.greaterThan(0);
      expect(moneyValues.length, 'money values in cart row').to.be.greaterThan(1);

      const unitPrice = moneyValues[0];
      const displayedTotal = moneyValues[moneyValues.length - 1];
      const expectedTotal = Number((unitPrice * quantity).toFixed(2));

      expect(displayedTotal, 'cart product total').to.eq(expectedTotal);
    });
  }

  private getProductRow(productName: string): Cypress.Chainable<JQuery<HTMLTableRowElement>> {
    return cy
      .contains(cartSelectors.cartProductLinks, exactTextPattern(productName))
      .parents('tr')
      .first();
  }
}

export const cartPage = new CartPage();
