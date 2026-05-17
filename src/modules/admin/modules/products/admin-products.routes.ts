import { ROUTE_NAMES } from '@/core/const/router.const'
import { adminProductSkusRoutes } from '@/modules/admin/modules/productSkus/admin-product-skus.routes'
import type { RouteRecordRaw } from 'vue-router'

export const adminProductsRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('./pages/AdminProductsPage.vue'),
    name: ROUTE_NAMES.admin.products,
  },
  {
    path: ':product',
    component: () => import('./pages/AdminProductPage.vue'),
    name: ROUTE_NAMES.admin.specificProduct,
  },
  {
    path: 'skus',
    children: adminProductSkusRoutes,
  },
]
