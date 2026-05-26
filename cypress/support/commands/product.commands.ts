import {
  searchProductFlow,
  verifySearchResultsFlow,
} from '../../flows/product/search-product.flow';
import {
  openFirstProductFromSearchResultsFlow,
  verifyProductDetailsPageFlow,
} from '../../flows/product/open-product-details.flow';
import { logStep } from '../log';
import {
  mockEmptyProductSearchResponseFlow,
  verifyNoSearchResultsMessageFlow,
} from '../../flows/product/mocked-product-search.flow';

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

Cypress.Commands.add('mockEmptyProductSearchResponse', (keyword: string) => {
  logStep('mockEmptyProductSearchResponse', `Mock empty product search response: ${keyword}`);
  mockEmptyProductSearchResponseFlow(keyword);
});

Cypress.Commands.add('shouldSeeNoSearchResultsMessage', () => {
  logStep('shouldSeeNoSearchResultsMessage', 'Verify no search results message is visible');
  verifyNoSearchResultsMessageFlow();
});
