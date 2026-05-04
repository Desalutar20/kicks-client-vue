import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/core/const/router.const.ts'

export const profileRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('./pages/ProfilePage.vue'),
    name: ROUTE_NAMES.profile,
    meta: {
      requireAuth: true,
    },
  },
]
