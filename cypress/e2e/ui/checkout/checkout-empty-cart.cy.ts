describe('Checkout Negative Scenarios', { tags: ['@ui', '@negative', '@regression'] }, () => {
  it('should not allow checkout when shopping cart is empty', () => {
    cy.openShoppingCart();

    cy.shouldSeeEmptyShoppingCart();
    cy.shouldNotSeeCheckoutButton();
  });
});
