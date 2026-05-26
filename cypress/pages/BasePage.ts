export abstract class BasePage {
  protected getElement(selector: string) {
    return cy.get(selector);
  }

  protected containsText(text: string) {
    return cy.contains(text);
  }

  protected visit(path: string) {
    return cy.visit(path);
  }

  protected clickElement(selector: string) {
    return this.getElement(selector).click();
  }

  protected clearAndType(selector: string, value: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.getElement(selector).clear().type(value);
  }

  protected shouldBeVisible(selector: string): void {
    this.getElement(selector).should('be.visible');
  }

  protected shouldHaveElements(selector: string) {
    return this.getElement(selector).should('have.length.greaterThan', 0);
  }
}
