describe('Home Page Healthcheck @ui @smoke', () => {
  it('should open Automation Test Store home page', () => {
    cy.visit('/');

    cy.url().should('include', 'automationteststore.com');
    cy.get('body').should('be.visible');
  });
});
