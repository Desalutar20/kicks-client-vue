import { createRouter, createWebHistory } from 'vue-router'
import { QUERY_KEYS } from '@/core/const/query-keys.const.ts'
import { ROUTE_NAMES } from '@/core/const/router.const.ts'
import MainLayout from '@/core/layouts/MainLayout.vue'
import type { ApiSuccessResponse } from '@/core/lib/api.lib.ts'
import { queryClient } from '@/core/lib/tanstack.lib.ts'
import { type User } from '@/core/types/api/user.type'
import { authRoutes } from '@/modules/auth/auth.routes.ts'
import TermsText from '@/modules/auth/components/TermsText.vue'
import { homeRoutes } from '@/modules/home/home.routes.ts'
import { profileRoutes } from '@/modules/profile/profile.routes.ts'
import { adminRoutes } from '@/modules/admin/admin.routes.ts'
import { getProfile } from '@/modules/auth/api/auth.api'
import { productsRoutes } from '@/modules/products/products.routes.ts'
import { UserRole } from '@/core/types/api/admin/admin-user.type'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          redirect: '/home',
        },
        {
          path: '/home',
          children: homeRoutes,
        },
        {
          path: '/products',
          children: productsRoutes,
        },
        {
          path: '/auth',
          children: authRoutes,
        },
        {
          path: '/profile',
          children: profileRoutes,
        },
      ],
    },
    {
      path: '/admin',
      children: adminRoutes,
    },
    {
      path: '/cart',
      component: TermsText,
      meta: {
        requireAuth: true,
      },
      name: ROUTE_NAMES.shoppingCart,
    },
  ],
})

router.beforeResolve(async (to) => {
  const cachedData = queryClient.getQueryData<ApiSuccessResponse<User>>(QUERY_KEYS.getProfile)
  let user = cachedData?.data ?? null
  const isAdminRoute = to.path.startsWith('/admin')

  if (!user && !to.path.startsWith('/auth')) {
    try {
      const data = await getProfile()
      user = data.data
      queryClient.setQueryData(QUERY_KEYS.getProfile, data)
    } catch {
      user = null
    }
  }

  if ((to.meta.requireAuth || isAdminRoute) && !user) {
    return { name: ROUTE_NAMES.auth.signIn, query: { redirectPath: to.path } }
  }

  const isAuthRoute = to.matched.some((r) => r.name === ROUTE_NAMES.auth.layout)
  if (isAuthRoute && user) {
    return {
      name: user.role === UserRole.Admin ? ROUTE_NAMES.admin.root : ROUTE_NAMES.home,
    }
  }

  if (isAdminRoute && user?.role !== UserRole.Admin) {
    return { name: ROUTE_NAMES.home }
  }

  if (!isAdminRoute && user?.role === UserRole.Admin) {
    return { name: ROUTE_NAMES.admin.root }
  }

  return true
})
