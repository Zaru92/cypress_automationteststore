export type ApiResponse<TBody = unknown> = Cypress.Response<TBody>;

export type HtmlApiResponse = ApiResponse<string>;
