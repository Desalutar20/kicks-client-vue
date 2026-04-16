export const apiEndpoints = {
  auth: {
    signUp: '/auth/sign-up',
    signIn: '/auth/sign-in',
    verifyAccount: '/auth/verify-account',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    getProfile: '/auth/profile',
  },
} as const
