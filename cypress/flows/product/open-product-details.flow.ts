import { productDetailsPage } from '../../pages/ProductDetailsPage';
import { productsPage } from '../../pages/ProductsPage';

export const openFirstProductFromSearchResultsFlow = (): void => {
  productsPage.openFirstProductFromResults();
};

export const verifyProductDetailsPageFlow = (): void => {
  productDetailsPage.assertLoaded();
};
