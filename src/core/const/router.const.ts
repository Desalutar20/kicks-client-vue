export const routeNames = {
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
  },
  shoppingCart: '/cart',
  profile: '/profile',
} as const
