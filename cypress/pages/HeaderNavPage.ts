import { BasePage } from './BasePage';
import { headerSelectors } from '../selectors/header.selectors';
import type { HeaderLinkKey } from '../types/navigation.types';

class HeaderNavPage extends BasePage {
  clickLink(key: HeaderLinkKey): void {
    this.clickElement(headerSelectors.links[key]);
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
