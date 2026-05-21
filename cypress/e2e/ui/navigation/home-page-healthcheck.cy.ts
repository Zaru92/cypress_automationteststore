describe('Home Page Healthcheck @ui @smoke', () => {
  it('should open Automation Test Store home page', () => {
    cy.openHomePage();

    cy.shouldSeeHomePage();
  });
});
