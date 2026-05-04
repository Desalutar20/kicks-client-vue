import { ROUTE_NAMES } from '@/core/const/router.const'
import AdminLayout from '@/modules/admin/layouts/AdminLayout.vue'
import { adminBrandsRoutes } from '@/modules/admin/modules/brands/admin-brands.routes'
import { adminCategoriesRoutes } from '@/modules/admin/modules/categories/admin-categories.routes'
import { adminUsersRoutes } from '@/modules/admin/modules/users/admin-users.routes'
import AdminRootPage from '@/modules/admin/pages/AdminRootPage.vue'
import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: ROUTE_NAMES.admin.root,
        component: AdminRootPage,
      },
      {
        path: 'users',
        children: adminUsersRoutes,
      },
      {
        path: 'brands',
        children: adminBrandsRoutes,
      },
      {
        path: 'categories',
        children: adminCategoriesRoutes,
      },
    ],
  },
]
