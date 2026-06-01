import type { HeaderNavLink } from '../../types/navigation.types';

export const headerNavLinks: readonly HeaderNavLink[] = [
  {
    name: 'Home',
    key: 'home',
    expectedRoute: '',
    expectedHeading: 'Featured',
  },
  {
    name: 'Specials',
    key: 'specials',
    expectedRoute: 'rt=product/special',
    expectedHeading: 'Special Offers',
  },
  // Account and "Login or register" are distinct header entry points that both
  // land on the login page for an unauthenticated visitor.
  {
    name: 'Account',
    key: 'account',
    expectedRoute: 'rt=account/login',
    expectedHeading: 'Account Login',
  },
  {
    name: 'Login or register',
    key: 'loginRegister',
    expectedRoute: 'rt=account/login',
    expectedHeading: 'Account Login',
  },
  {
    name: 'Cart',
    key: 'cart',
    expectedRoute: 'rt=checkout/cart',
    expectedHeading: 'Shopping Cart',
  },
  {
    name: 'Checkout',
    key: 'checkout',
    expectedRoute: 'rt=checkout/cart',
    expectedHeading: 'Shopping Cart',
  },
];
