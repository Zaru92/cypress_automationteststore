import { setAllureMetadata } from '../../../support/allure';

describe('Home Page Healthcheck', { tags: ['@ui', '@smoke'] }, () => {
  it('should open Automation Test Store home page', () => {
    setAllureMetadata({
      epic: 'Test Infrastructure',
      feature: 'Healthcheck',
      story: 'Home page availability',
      severity: 'minor',
      tags: ['ui', 'smoke'],
    });

    cy.openHomePage();

    cy.shouldSeeHomePage();
  });
});
