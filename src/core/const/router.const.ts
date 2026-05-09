export const ROUTE_NAMES = {
  home: 'home',
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
    products: 'products',
    users: 'users',
    brands: 'brands',
    categories: 'categories',
  },
  shoppingCart: 'cart',
  profile: 'profile',
} as const
