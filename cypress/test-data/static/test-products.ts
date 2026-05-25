import type { TestProduct } from '../../types/product.types';

export const testProducts = {
  curlsToStraightShampoo: {
    name: 'Curls to straight Shampoo',
    searchKeyword: 'shampoo',
  },
} as const satisfies Record<string, TestProduct>;
