import { ROUTE_NAMES } from '@/core/const/router.const'
import type { RouteRecordRaw } from 'vue-router'

export const adminProductsRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('./pages/AdminProductsPage.vue'),
    name: ROUTE_NAMES.admin.products,
  },
]
