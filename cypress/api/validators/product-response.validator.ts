import { expectSuccessfulHtmlResponse } from './http-response.validator';
import { productsSelectors } from '../../selectors/products.selectors';
import type { HtmlApiResponse } from '../../types/api.types';

const parseSearchResultNames = (body: string): string[] =>
  Cypress.$(body)
    .find(productsSelectors.searchResultProductNames)
    .map((_, el) => Cypress.$(el).text().trim())
    .get();

export const expectProductSearchResultsResponse = (
  response: HtmlApiResponse,
  expectedProductName: string,
): void => {
  expectSuccessfulHtmlResponse(response);

  const resultNames = parseSearchResultNames(response.body);

  expect(resultNames, 'search results').to.have.length.greaterThan(0);
  expect(
    resultNames.some((name) => name.includes(expectedProductName)),
    `search results contain "${expectedProductName}"`,
  ).to.equal(true);
};

export const expectProductSearchWithoutKnownProductResponse = (response: HtmlApiResponse): void => {
  expectSuccessfulHtmlResponse(response);

  const resultNames = parseSearchResultNames(response.body);

  expect(resultNames, 'search results grid').to.have.lengthOf(0);
  expect(response.body, 'no-results marker').to.include(productsSelectors.searchNoResultsMessage);
};
