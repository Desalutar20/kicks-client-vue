export const ROUTE_NAMES = {
  home: 'home',
  shoppingCart: 'cart',
  profile: 'profile',
  products: {
    root: 'products',
    specificProduct: 'product',
  },

  auth: {
    layout: 'auth-layout',
    signUp: 'sign-up',
    signIn: 'sign-in',
    forgotPassword: 'forgot-password',
    resetPassword: 'reset-password',
    accountVerification: 'account-verification',
  },
  admin: {
    root: 'admin-root',
    products: 'admin-products',
    specificProduct: 'admin-product',
    productSkus: 'admin-products-skus',
    specificProductSku: 'admin-product-ku',
    users: 'users',
    brands: 'brands',
    categories: 'categories',
  },
} as const
