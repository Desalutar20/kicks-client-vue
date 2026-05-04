import { ROUTE_NAMES } from '@/core/const/router.const'
import type { RouteRecordRaw } from 'vue-router'

export const adminCategoriesRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('./pages/AdminCategoriesPage.vue'),
    name: ROUTE_NAMES.admin.categories,
  },
]
