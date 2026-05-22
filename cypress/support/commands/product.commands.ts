import {
  searchProductFlow,
  verifySearchResultsFlow,
} from '../../flows/product/search-product.flow';
import { logStep } from '../log';

Cypress.Commands.add('searchProduct', (keyword: string) => {
  logStep('searchProduct', `Search product by keyword: ${keyword}`);
  searchProductFlow(keyword);
});

Cypress.Commands.add('shouldSeeSearchResults', (keyword: string) => {
  logStep('shouldSeeSearchResults', `Verify search results for keyword: ${keyword}`);
  verifySearchResultsFlow(keyword);
});
