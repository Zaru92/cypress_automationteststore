import {
  expectHtmlResponseNotToContain,
  expectHtmlResponseToContain,
  expectSuccessfulHtmlResponse,
} from './http-response.validator';
import type { HtmlApiResponse } from '../../types/api.types';

export const expectProductSearchResultsResponse = (
  response: HtmlApiResponse,
  expectedProductName: string,
): void => {
  expectSuccessfulHtmlResponse(response);
  expectHtmlResponseToContain(response, expectedProductName);
};

export const expectProductSearchWithoutKnownProductResponse = (
  response: HtmlApiResponse,
  knownProductName: string,
): void => {
  expectSuccessfulHtmlResponse(response);
  expectHtmlResponseNotToContain(response, knownProductName);
  expectHtmlResponseNotToContain(response, 'Fatal error');
  expectHtmlResponseNotToContain(response, 'Internal Server Error');
};
