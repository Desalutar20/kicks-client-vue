import { ROUTE_NAMES } from '@/core/const/router.const'
import type { RouteRecordRaw } from 'vue-router'

export const adminProductSkusRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('./pages/AdminProductSkusPage.vue'),
    name: ROUTE_NAMES.admin.productSkus,
  },
  {
    path: ':id',
    component: () => import('./pages/AdminProductSkuPage.vue'),
    name: ROUTE_NAMES.admin.specificProductSku,
  },
]
