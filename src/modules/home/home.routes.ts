import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/core/const/router.const.ts'

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('./pages/HomePage.vue'),
    name: ROUTE_NAMES.home,
  },
]
