export const cartSelectors = {
  cartHeading: '.maintext',
  cartContentPanel: '.contentpanel',
  cartProductLinks: '.contentpanel a[href*="product/product"]',
  checkoutButton: '#cart_checkout1, a[title="Checkout"], a[href*="checkout/shipping"]',
  continueButton: 'a[title="Continue"], a[href*="index/home"]',
} as const;
