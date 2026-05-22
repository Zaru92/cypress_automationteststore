export const productDetailsSelectors = {
  productTitle: 'h1.productname',
  productPrice: '.productfilneprice, .productprice',
  quantityInput: '#product_quantity',
  addToCartButton: '.cart',
  productDescriptionTab: 'a[href="#description"]',
  productDescription: '#description',
} as const;
