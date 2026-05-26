export const productsSelectors = {
  searchInput: '#filter_keyword',
  searchResultsContainer: '.contentpanel',
  searchResultsGrid: '.contentpanel .thumbnails.grid',
  searchResultProductNames: '.contentpanel .thumbnails.grid .prdocutname',
  searchNoResultsMessage: 'There is no product that matches the search criteria.',
  mockedSearchResults: '[data-cy="mocked-search-results"]',
  mockedEmptySearchResultsMessage: '.empty-search-results',
  serverErrorState: '[data-cy="mocked-server-error"]',
  serverErrorMessage: '[data-cy="mocked-server-error-message"]',
  mainHeading: '.maintext',
} as const;
