export const cartSelectors = {
  cartHeading: '.maintext',
  cartContentPanel: '.contentpanel',
  cartTable: '.contentpanel table',
  cartRows: '.contentpanel table tbody tr',
  cartProductLinks: '.contentpanel a[href*="product/product"]',
  productQuantityInput: 'input[name^="quantity"]',
  checkoutButton: '#cart_checkout1, a[title="Checkout"], a[href*="checkout/shipping"]',
  continueButton: 'a[title="Continue"], a[href*="index/home"]',
} as const;
