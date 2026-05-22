describe('Product Search @ui @smoke', () => {
  it('should display products matching search phrase', () => {
    cy.openHomePage();

    cy.searchProduct('shampoo');

    cy.shouldSeeSearchResults('shampoo');
  });
});
