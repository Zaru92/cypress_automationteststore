import { setAllureMetadata } from '../../../support/allure';

describe('Checkout Negative Scenarios', { tags: ['@ui', '@negative', '@regression'] }, () => {
  it('should not allow checkout when shopping cart is empty', () => {
    setAllureMetadata({
      epic: 'Checkout',
      feature: 'Checkout Validation',
      story: 'Prevent checkout with empty cart',
      severity: 'critical',
      tags: ['ui', 'negative', 'regression'],
    });

    cy.openShoppingCart();

    cy.shouldSeeEmptyShoppingCart();
    cy.shouldNotSeeCheckoutButton();
  });
});
