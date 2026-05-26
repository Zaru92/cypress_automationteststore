describe('Checkout Negative Scenarios @ui @negative @regression', () => {
  it('should not allow checkout when shopping cart is empty', () => {
    cy.openShoppingCart();

    cy.shouldSeeEmptyShoppingCart();
    cy.shouldNotSeeCheckoutButton();
  });
});
