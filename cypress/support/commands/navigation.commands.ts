import { openHomePageFlow, verifyHomePageIsVisibleFlow } from '../../flows/navigation/home.flow';
import { logStep } from '../log';

Cypress.Commands.add('openHomePage', () => {
  logStep('openHomePage', 'Open Automation Test Store home page');
  openHomePageFlow();
});

Cypress.Commands.add('shouldSeeHomePage', () => {
  logStep('shouldSeeHomePage', 'Verify Automation Test Store home page is visible');
  verifyHomePageIsVisibleFlow();
});
