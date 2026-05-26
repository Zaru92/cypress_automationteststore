import {
  expectHtmlResponseToContain,
  expectSuccessfulHtmlResponse,
} from './http-response.validator';
import type { HtmlApiResponse } from '../../types/api.types';

export const expectShoppingCartResponse = (response: HtmlApiResponse): void => {
  expectSuccessfulHtmlResponse(response);
  expectHtmlResponseToContain(response, 'Shopping Cart');
};
