export interface ProductSearchData {
  keyword: string;
}

export const buildProductSearchData = (
  overrides: Partial<ProductSearchData> = {},
): ProductSearchData => ({
  keyword: 'shampoo',
  ...overrides,
});
