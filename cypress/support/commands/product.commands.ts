import {
  searchProductFlow,
  verifySearchResultsFlow,
} from '../../flows/product/search-product.flow';
import {
  openFirstProductFromSearchResultsFlow,
  verifyProductDetailsPageFlow,
} from '../../flows/product/open-product-details.flow';
import { logStep } from '../log';

Cypress.Commands.add('searchProduct', (keyword: string) => {
  logStep('searchProduct', `Search product by keyword: ${keyword}`);
  searchProductFlow(keyword);
});

Cypress.Commands.add('shouldSeeSearchResults', (keyword: string) => {
  logStep('shouldSeeSearchResults', `Verify search results for keyword: ${keyword}`);
  verifySearchResultsFlow(keyword);
});

Cypress.Commands.add('openFirstProductFromSearchResults', () => {
  logStep('openFirstProductFromSearchResults', 'Open first product from search results');
  openFirstProductFromSearchResultsFlow();
});

Cypress.Commands.add('shouldSeeProductDetailsPage', () => {
  logStep('shouldSeeProductDetailsPage', 'Verify product details page is visible');
  verifyProductDetailsPageFlow();
});
