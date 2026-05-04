import { ROUTE_NAMES } from '@/core/const/router.const'
import type { RouteRecordRaw } from 'vue-router'

export const adminUsersRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('./pages/AdminUsersPage.vue'),
    name: ROUTE_NAMES.admin.users,
  },
]
