import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/modules/auth/auth.routes.ts'
import MainLayout from '@/core/layouts/MainLayout.vue'
import { homeRoutes } from '@/modules/home/home.routes.ts'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          redirect: '/home',
        },
        {
          path: '/home',
          children: homeRoutes,
        },
        {
          path: '/auth',
          children: authRoutes,
        },
      ],
    },
  ],
})
