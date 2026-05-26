import { expectSuccessfulHtmlResponse } from './http-response.validator';
import { productsSelectors } from '../../selectors/products.selectors';
import type { HtmlApiResponse } from '../../types/api.types';

const SKU_SUFFIX = /\s*\([^)]*\)\s*$/;

const normalizeResultName = (raw: string): string =>
  raw.replace(/\s+/g, ' ').replace(SKU_SUFFIX, '').trim();

const parseSearchResultNames = (body: string): string[] => {
  const names = Cypress.$(body)
    .find(productsSelectors.searchResultProductNames)
    .map((_, el) => normalizeResultName(Cypress.$(el).text()))
    .get();
  return [...new Set(names)];
};

export const expectProductSearchResultsResponse = (
  response: HtmlApiResponse,
  expectedProductName: string,
): void => {
  expectSuccessfulHtmlResponse(response);

  const resultNames = parseSearchResultNames(response.body);

  expect(resultNames, 'search results').to.have.length.greaterThan(0);
  expect(resultNames, `search results include exact "${expectedProductName}"`).to.include(
    expectedProductName,
  );
};

export const expectProductSearchWithoutKnownProductResponse = (response: HtmlApiResponse): void => {
  expectSuccessfulHtmlResponse(response);

  const resultNames = parseSearchResultNames(response.body);

  expect(resultNames, 'search results grid').to.have.lengthOf(0);
  expect(response.body, 'no-results marker').to.include(productsSelectors.searchNoResultsMessage);
};
