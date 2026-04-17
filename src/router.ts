import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/modules/auth/auth.routes.ts'
import MainLayout from '@/core/layouts/MainLayout.vue'
import { homeRoutes } from '@/modules/home/home.routes.ts'
import { routeNames } from '@/core/const/router.const.ts'
import { type User, UserRole } from '@/core/types/user.type.ts'
import { useQueryCache } from '@pinia/colada'
import { QUERY_KEYS } from '@/core/const/query-keys.const.ts'
import type { ApiSuccessResponse } from '@/core/api/api.ts'
import { getProfile } from '@/modules/auth/api/auth.api.ts'
import TermsText from '@/modules/auth/components/TermsText.vue'

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
          path: '/auth',
          children: authRoutes,
        },
      ],
    },
    {
      path: '/test',
      component: TermsText,
    },
  ],
})

router.beforeResolve(async (to) => {
  const cache = useQueryCache()

  let user: User | null =
    (cache.getQueryData(QUERY_KEYS.getProfile) as ApiSuccessResponse<User> | null)?.data ?? null

  if (!user) {
    try {
      const res = await getProfile()
      user = res.data

      cache.setQueryData(QUERY_KEYS.getProfile, res)
    } catch {
      user = null
    }
  }

  if (!user) {
    return to.meta.requireAuth ? { name: routeNames.auth.signIn } : true
  }

  const isAuthRoute = to.matched.some((r) => r.name === routeNames.auth.layout)
  if (isAuthRoute) {
    return {
      name: user.role === UserRole.Admin ? routeNames.admin.root : routeNames.home,
    }
  }

  if (to.meta.onlyAdmin && user.role !== UserRole.Admin) {
    return { name: routeNames.home }
  }

  if (!to.meta.onlyAdmin && user.role === UserRole.Admin) {
    return { name: routeNames.admin.root }
  }

  return true
})
