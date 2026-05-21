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

  protected shouldBeVisible(selector: string): void {
    this.getElement(selector).should('be.visible');
  }
}
