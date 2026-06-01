import { cartPage } from '../../pages/CartPage';

export const deleteProductFromCartFlow = (productName: string): void => {
  cartPage.deleteProduct(productName);
};

export const verifyProductIsDeletedFromCartFlow = (productName: string): void => {
  cartPage.shouldNotContainProduct(productName);
};
