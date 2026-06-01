export const headerSelectors = {
  links: {
    home: '#categorymenu a[href$="automationteststore.com/"]',
    specials: '#main_menu_top a[href*="rt=product/special"]',
    account: '#main_menu_top a[href*="rt=account/account"]',
    cart: '#main_menu_top a[href*="rt=checkout/cart"]',
    checkout: '#main_menu_top a[href*="rt=checkout/shipping"]',
    loginRegister: '#customer_menu_top a[href*="rt=account/login"]',
  },
  pageHeading: '.heading1',
} as const;
