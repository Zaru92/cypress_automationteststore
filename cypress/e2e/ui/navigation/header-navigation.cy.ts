import { setAllureMetadata } from '../../../support/allure';
import { headerNavLinks } from '../../../test-data/static/header-nav-links';

describe('Header Navigation', { tags: ['@ui'] }, () => {
  beforeEach(() => {
    cy.openHomePage();
  });

  headerNavLinks.forEach((link) => {
    it(`opens the ${link.name} page from the header`, () => {
      setAllureMetadata({
        epic: 'Navigation',
        feature: 'Header',
        story: link.name,
        severity: 'normal',
        tags: ['ui', 'navigation'],
      });

      cy.openHeaderLink(link);

      cy.shouldSeeHeaderPage(link);
    });
  });
});
