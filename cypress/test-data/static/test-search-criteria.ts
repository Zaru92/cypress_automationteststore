import type { ProductSearchCriteria } from '../../types/product.types';

export const productSearchCriteria: Record<string, ProductSearchCriteria> = {
  noResults: {
    keyword: 'not-existing-product-qa-999999',
  },
  specialCharacters: {
    keyword: '!@#$%^&*()_+',
  },
};
