import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/core/const/router.const.ts'

export const productsRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('./pages/ProductSkusPage.vue'),
    name: ROUTE_NAMES.products.root,
  },
  {
    path: ':id',
    component: () => import('./pages/ProductSkuPage.vue'),
    name: ROUTE_NAMES.products.specificProduct,
  },
]
