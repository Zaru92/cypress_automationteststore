import type { HeaderNavLink } from '../../types/navigation.types';
import { openHomePageFlow, verifyHomePageIsVisibleFlow } from '../../flows/navigation/home.flow';
import {
  openHeaderLinkFlow,
  verifyHeaderLinkPageFlow,
} from '../../flows/navigation/header-nav.flow';
import { logStep } from '../log';

Cypress.Commands.add('openHomePage', () => {
  logStep('openHomePage', 'Open Automation Test Store home page');
  openHomePageFlow();
});

Cypress.Commands.add('shouldSeeHomePage', () => {
  logStep('shouldSeeHomePage', 'Verify Automation Test Store home page is visible');
  verifyHomePageIsVisibleFlow();
});

Cypress.Commands.add('openHeaderLink', (link: HeaderNavLink) => {
  logStep('openHeaderLink', `Open "${link.name}" link from the header`);
  openHeaderLinkFlow(link);
});

Cypress.Commands.add('shouldSeeHeaderPage', (link: HeaderNavLink) => {
  logStep('shouldSeeHeaderPage', `Verify "${link.name}" header link opened the correct page`);
  verifyHeaderLinkPageFlow(link);
});
