import { productDetailsPage } from '../../pages/ProductDetailsPage';
import { productsPage } from '../../pages/ProductsPage';
import { cartPage } from '../../pages/CartPage';
import { searchProductFlow, verifySearchResultsFlow } from '../product/search-product.flow';

export const addProductToCartFlow = (productName: string, searchKeyword = productName): void => {
  searchProductFlow(searchKeyword);
  verifySearchResultsFlow(searchKeyword);

  productsPage.openProductFromResultsByName(productName);

  productDetailsPage.assertLoaded();
  productDetailsPage.shouldDisplayProductTitle(productName);
  productDetailsPage.addCurrentProductToCart();
};

export const verifyShoppingCartPageFlow = (): void => {
  cartPage.assertLoaded();
};

export const verifyProductInCartFlow = (productName: string): void => {
  cartPage.shouldContainProduct(productName);
};

export const verifyProductQuantityInCartFlow = (
  productName: string,
  expectedQuantity: number,
): void => {
  cartPage.shouldHaveProductQuantity(productName, expectedQuantity);
};

export const verifyCorrectProductTotalInCartFlow = (productName: string): void => {
  cartPage.shouldHaveCorrectProductTotal(productName);
};
