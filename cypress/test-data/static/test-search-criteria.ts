import type { ProductSearchCriteria } from '../../types/product.types';

export const productSearchCriteria = {
  noResults: {
    keyword: 'not-existing-product-qa-999999',
  },
  specialCharacters: {
    keyword: '!@#$%^&*()_+',
  },
} as const satisfies Record<string, ProductSearchCriteria>;
