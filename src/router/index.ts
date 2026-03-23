import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'home', component: () => import('@/views/HomeView.vue') },
        {
          path: 'games',
          name: 'game-search',
          component: () => import('@/views/games/GameSearchView.vue'),
        },
        {
          path: 'games/:id',
          name: 'game-detail',
          component: () => import('@/views/games/GameDetailView.vue'),
        },
        {
          path: 'consoles/:id',
          name: 'console-detail',
          component: () => import('@/views/consoles/ConsoleDetailView.vue'),
        },
        {
          path: 'library',
          name: 'library',
          component: () => import('@/views/library/LibraryView.vue'),
        },
        {
          path: 'wishlist',
          name: 'wishlist',
          component: () => import('@/views/wishlist/WishlistView.vue'),
        },
        {
          path: 'analytics',
          name: 'analytics',
          component: () => import('@/views/analytics/AnalyticsView.vue'),
        },
      ],
    },
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        { path: 'login', name: 'login', component: () => import('@/views/auth/LoginView.vue') },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' }
  }
})

export default router
