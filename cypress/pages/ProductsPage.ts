import { BasePage } from './BasePage';
import { productsSelectors } from '../selectors/products.selectors';
import { exactTextPattern } from '../utils/text';

class ProductsPage extends BasePage {
  searchForProduct(keyword: string): void {
    this.getElement(productsSelectors.searchInput).clear().type(`${keyword}{enter}`);
  }

  openFirstProductFromResults(): void {
    this.getElement(productsSelectors.searchResultProductNames).first().click();
  }

  openProductFromResultsByName(productName: string): void {
    cy.contains(productsSelectors.searchResultProductNames, exactTextPattern(productName)).click();
  }

  shouldDisplaySearchResults(keyword: string): void {
    cy.location('search').should((search) => {
      const params = new URLSearchParams(search);
      expect(params.get('rt')).to.eq('product/search');
      expect(params.get('keyword')).to.eq(keyword);
    });

    this.shouldBeVisible(productsSelectors.searchResultsGrid);
    this.shouldHaveElements(productsSelectors.searchResultProductNames);
  }

  shouldDisplayProductsMatchingKeyword(keyword: string): void {
    const target = keyword.toLowerCase();
    this.getElement(productsSelectors.searchResultProductNames).should(($products) => {
      expect($products).to.have.length.greaterThan(0);
      [...$products].forEach((el) => {
        const name = el.textContent?.trim().toLowerCase() ?? '';
        expect(name, 'every result must match keyword').to.include(target);
      });
    });
  }

  shouldDisplayNoSearchResultsMessage(): void {
    this.shouldBeVisible(productsSelectors.mockedSearchResults);
    this.shouldBeVisible(productsSelectors.mockedEmptySearchResultsMessage);
    this.getElement(productsSelectors.mockedEmptySearchResultsMessage).should(
      'contain.text',
      'No products were found',
    );
  }

  shouldDisplaySearchServerErrorMessage(): void {
    this.shouldBeVisible(productsSelectors.serverErrorState);
    this.shouldBeVisible(productsSelectors.serverErrorMessage);
    this.getElement(productsSelectors.serverErrorMessage).should(
      'contain.text',
      'Product search is temporarily unavailable',
    );
  }
}

export const productsPage = new ProductsPage();
