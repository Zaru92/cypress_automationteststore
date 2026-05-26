export const productEndpoints = {
  search: (keyword: string): string =>
    `/index.php?rt=product/search&keyword=${encodeURIComponent(keyword)}`,
} as const;
