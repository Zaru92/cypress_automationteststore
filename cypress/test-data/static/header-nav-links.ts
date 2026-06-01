import type { HeaderNavLink } from '../../types/navigation.types';
import { headerSelectors } from '../../selectors/header.selectors';

export const headerNavLinks: readonly HeaderNavLink[] = [
  {
    name: 'Home',
    selector: headerSelectors.links.home,
    expectedRoute: '',
    expectedHeading: 'Featured',
  },
  {
    name: 'Specials',
    selector: headerSelectors.links.specials,
    expectedRoute: 'rt=product/special',
    expectedHeading: 'Special Offers',
  },
  {
    name: 'Account',
    selector: headerSelectors.links.account,
    expectedRoute: 'rt=account/login',
    expectedHeading: 'Account Login',
  },
  {
    name: 'Login or register',
    selector: headerSelectors.links.loginRegister,
    expectedRoute: 'rt=account/login',
    expectedHeading: 'Account Login',
  },
  {
    name: 'Cart',
    selector: headerSelectors.links.cart,
    expectedRoute: 'rt=checkout/cart',
    expectedHeading: 'Shopping Cart',
  },
  {
    name: 'Checkout',
    selector: headerSelectors.links.checkout,
    expectedRoute: 'rt=checkout/cart',
    expectedHeading: 'Shopping Cart',
  },
];
