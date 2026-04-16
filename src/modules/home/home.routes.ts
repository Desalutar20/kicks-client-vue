import type { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/core/const/router.const.ts'

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('./pages/HomePage.vue'),
    name: routeNames.home,
  },
]
