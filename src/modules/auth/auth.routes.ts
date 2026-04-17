import { type RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/core/const/router.const.ts'
import AuthLayout from '@/modules/auth/layouts/AuthLayout.vue'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: routeNames.auth.layout,
    component: AuthLayout,
    redirect: () => {
      return { name: routeNames.auth.signIn }
    },
    children: [
      {
        path: 'sign-up',
        component: () => import('./pages/SignUpPage.vue'),
        name: routeNames.auth.signUp,
      },
      {
        path: 'sign-in',
        component: () => import('./pages/SignInPage.vue'),
        name: routeNames.auth.signIn,
      },
    ],
  },
  {
    path: 'account-verification',
    component: () => import('./pages/AccountVerificationPage.vue'),
    name: routeNames.auth.accountVerification,
  },
  {
    path: 'forgot-password',
    component: () => import('./pages/ForgotPasswordPage.vue'),
    name: routeNames.auth.forgotPassword,
  },
  {
    path: 'reset-password',
    component: () => import('./pages/ResetPasswordPage.vue'),
    name: routeNames.auth.resetPassword,
  },
]
