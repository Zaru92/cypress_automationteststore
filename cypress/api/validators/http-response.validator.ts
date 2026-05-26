import type { HtmlApiResponse } from '../../types/api.types';

const getHeaderValue = (response: HtmlApiResponse, headerName: string): string => {
  const header = response.headers[headerName.toLowerCase()];

  if (Array.isArray(header)) {
    return header.join('; ');
  }

  return String(header ?? '');
};

export const expectStatusCode = (response: HtmlApiResponse, expectedStatus: number): void => {
  expect(response.status, 'response status').to.eq(expectedStatus);
};

export const expectContentTypeToInclude = (
  response: HtmlApiResponse,
  expectedContentType: string,
): void => {
  const contentType = getHeaderValue(response, 'content-type');

  expect(contentType, 'content-type header').to.include(expectedContentType);
};

export const expectHtmlResponseToContain = (
  response: HtmlApiResponse,
  expectedText: string,
): void => {
  expect(response.body, `response body contains "${expectedText}"`).to.include(expectedText);
};

export const expectHtmlResponseNotToContain = (
  response: HtmlApiResponse,
  unexpectedText: string,
): void => {
  expect(response.body, `response body does not contain "${unexpectedText}"`).not.to.include(
    unexpectedText,
  );
};

export const expectSuccessfulHtmlResponse = (response: HtmlApiResponse): void => {
  expectStatusCode(response, 200);
  expectContentTypeToInclude(response, 'text/html');
};

export const expectNotFoundResponse = (response: HtmlApiResponse): void => {
  expectStatusCode(response, 404);
};
