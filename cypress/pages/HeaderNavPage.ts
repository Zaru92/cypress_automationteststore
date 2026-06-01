import { BasePage } from './BasePage';
import { headerSelectors } from '../selectors/header.selectors';

class HeaderNavPage extends BasePage {
  clickLink(selector: string): void {
    this.clickElement(selector);
  }

  assertOnPage(expectedRoute: string, expectedHeading: string): void {
    if (expectedRoute === '') {
      cy.location('pathname').should('eq', '/');
    } else {
      cy.location('search').should('contain', expectedRoute);
    }

    this.getElement(headerSelectors.pageHeading)
      .first()
      .should('be.visible')
      .and('contain.text', expectedHeading);
  }
}

export const headerNavPage = new HeaderNavPage();
