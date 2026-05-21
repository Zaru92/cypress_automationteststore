import { BasePage } from './BasePage';
import { homeSelectors } from '../selectors/home.selectors';

class HomePage extends BasePage {
  open(): void {
    this.visit('/');
  }

  assertLoaded(): void {
    this.shouldBeOnHomeUrl();
    this.shouldBeVisible(homeSelectors.pageBody);
    this.shouldBeVisible(homeSelectors.searchInput);
    this.shouldBeVisible(homeSelectors.categoryMenu);
  }

  shouldBeOnHomeUrl(): void {
    cy.location('hostname').should('include', 'automationteststore.com');
  }
}

export const homePage = new HomePage();
