import { ROUTE_NAMES } from '@/core/const/router.const'
import type { RouteRecordRaw } from 'vue-router'

export const adminBrandsRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('./pages/AdminBrandsPage.vue'),
    name: ROUTE_NAMES.admin.brands,
  },
]
