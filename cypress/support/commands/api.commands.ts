import { cartApiClient } from '../../api/clients/CartApiClient';
import { negativeApiClient } from '../../api/clients/NegativeApiClient';
import { productApiClient } from '../../api/clients/ProductApiClient';
import { logStep } from '../log';

Cypress.Commands.add('apiSearchProducts', (keyword: string) => {
  logStep('apiSearchProducts', `Search products via HTTP request: ${keyword}`);
  return productApiClient.searchProducts(keyword);
});

Cypress.Commands.add('apiGetCart', () => {
  logStep('apiGetCart', 'Get shopping cart via HTTP request');
  return cartApiClient.getCart();
});

Cypress.Commands.add('apiGetNotExistingPage', () => {
  logStep('apiGetNotExistingPage', 'Get not existing page via HTTP request');
  return negativeApiClient.getNotExistingPage();
});
