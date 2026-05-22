import { BasePage } from './BasePage';
import { productsSelectors } from '../selectors/products.selectors';

class ProductsPage extends BasePage {
  searchForProduct(keyword: string): void {
    this.getElement(productsSelectors.searchInput).clear().type(`${keyword}{enter}`);
  }

  shouldDisplaySearchResults(keyword: string): void {
    cy.location('search').should((search) => {
      const params = new URLSearchParams(search);
      expect(params.get('rt')).to.eq('product/search');
      expect(params.get('keyword')).to.eq(keyword);
    });

    this.shouldBeVisible(productsSelectors.productGrid);
    this.getElement(productsSelectors.productNameLinks).should('have.length.greaterThan', 0);
  }

  shouldDisplayProductContainingText(expectedText: string): void {
    this.getElement(productsSelectors.productNameLinks).should(($products) => {
      const productNames = [...$products].map((product) =>
        product.textContent?.trim().toLowerCase(),
      );

      expect(productNames.some((name) => name?.includes(expectedText.toLowerCase()))).to.eq(true);
    });
  }
}

export const productsPage = new ProductsPage();
