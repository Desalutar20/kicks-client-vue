import { type RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/core/const/router.const.ts'
import AuthLayout from '@/modules/auth/layouts/AuthLayout.vue'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: ROUTE_NAMES.auth.layout,
    component: AuthLayout,
    redirect: () => {
      return { name: ROUTE_NAMES.auth.signIn }
    },
    children: [
      {
        path: 'sign-up',
        component: () => import('./pages/SignUpPage.vue'),
        name: ROUTE_NAMES.auth.signUp,
      },
      {
        path: 'sign-in',
        component: () => import('./pages/SignInPage.vue'),
        name: ROUTE_NAMES.auth.signIn,
      },
    ],
  },
  {
    path: 'account-verification',
    component: () => import('./pages/AccountVerificationPage.vue'),
    name: ROUTE_NAMES.auth.accountVerification,
  },
  {
    path: 'forgot-password',
    component: () => import('./pages/ForgotPasswordPage.vue'),
    name: ROUTE_NAMES.auth.forgotPassword,
  },
  {
    path: 'reset-password',
    component: () => import('./pages/ResetPasswordPage.vue'),
    name: ROUTE_NAMES.auth.resetPassword,
  },
]
