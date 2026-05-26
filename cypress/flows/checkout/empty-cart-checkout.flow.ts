import { cartPage } from '../../pages/CartPage';

export const openShoppingCartFlow = (): void => {
  cartPage.open();
};

export const verifyEmptyShoppingCartFlow = (): void => {
  cartPage.shouldBeEmpty();
};

export const verifyCheckoutButtonIsNotVisibleFlow = (): void => {
  cartPage.shouldNotDisplayCheckoutButton();
};
