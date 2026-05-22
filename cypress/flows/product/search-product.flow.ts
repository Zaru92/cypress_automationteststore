import { productsPage } from '../../pages/ProductsPage';

export const searchProductFlow = (keyword: string): void => {
  productsPage.searchForProduct(keyword);
};

export const verifySearchResultsFlow = (keyword: string): void => {
  productsPage.shouldDisplaySearchResults(keyword);
  productsPage.shouldDisplayProductContainingText(keyword);
};
