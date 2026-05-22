describe('Product Details @ui @regression', () => {
  it('should open product details page from search results', () => {
    cy.openHomePage();

    cy.searchProduct('shampoo');
    cy.shouldSeeSearchResults('shampoo');

    cy.openFirstProductFromSearchResults();

    cy.shouldSeeProductDetailsPage();
  });
});
