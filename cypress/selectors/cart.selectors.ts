export const cartSelectors = {
  cartHeading: '.maintext',
  cartContentPanel: '.contentpanel',
  cartTable: '.contentpanel table',
  cartRows: '.contentpanel table tbody tr',
  cartProductLinks: '.contentpanel a[href*="product/product"]',
  productQuantityInput: 'input[name^="quantity"]',
  emptyCartMessage: '.contentpanel',
  checkoutButton:
    '#cart_checkout1, .contentpanel #cart_checkout1, .contentpanel a[href*="checkout/shipping"]',
  continueButton: 'a[title="Continue"], a[href*="index/home"]',
  deleteProductButton: '.fa-trash-o',
} as const;
