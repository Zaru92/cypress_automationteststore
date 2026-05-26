import { productsPage } from '../../pages/ProductsPage';

export const mockEmptyProductSearchResponseFlow = (keyword: string): void => {
  cy.intercept(
    {
      method: 'GET',
      pathname: '/index.php',
      query: {
        rt: 'product/search',
        keyword,
      },
    },
    {
      statusCode: 200,
      headers: {
        'content-type': 'text/html; charset=UTF-8',
      },
      fixture: 'api/product-search-empty.html',
    },
  ).as('emptyProductSearch');
};

export const verifyNoSearchResultsMessageFlow = (): void => {
  cy.wait('@emptyProductSearch');
  productsPage.shouldDisplayNoSearchResultsMessage();
};
