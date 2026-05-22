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

  shouldDisplayProductsMatchingKeyword(keyword: string): void {
    const target = keyword.toLowerCase();
    this.getElement(productsSelectors.productNameLinks)
      .should('have.length.greaterThan', 0)
      .each(($el) => {
        expect($el.text().trim().toLowerCase(), 'every result must match keyword').to.include(
          target,
        );
      });
  }
}

export const productsPage = new ProductsPage();
