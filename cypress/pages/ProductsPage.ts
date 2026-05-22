import { BasePage } from './BasePage';
import { productsSelectors } from '../selectors/products.selectors';

class ProductsPage extends BasePage {
  searchForProduct(keyword: string): void {
    this.getElement(productsSelectors.searchInput).clear().type(`${keyword}{enter}`);
  }

  openFirstProductFromResults(): void {
    this.getElement(productsSelectors.searchResultProductNames).first().click();
  }

  shouldDisplaySearchResults(keyword: string): void {
    cy.location('href').should('include', 'product/search');
    cy.location('href').should('include', `keyword=${keyword}`);

    this.shouldBeVisible(productsSelectors.searchResultsGrid);
    this.shouldHaveElements(productsSelectors.searchResultProductNames);
  }

  shouldDisplayProductContainingText(expectedText: string): void {
    this.getElement(productsSelectors.searchResultProductNames).should(($products) => {
      const productNames = [...$products].map((product) =>
        product.textContent?.trim().toLowerCase(),
      );

      expect(productNames.some((name) => name?.includes(expectedText.toLowerCase()))).to.eq(true);
    });
  }
}

export const productsPage = new ProductsPage();
