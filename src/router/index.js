import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pag',
      name: 'pag',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PagView.vue'),
    },
    {
      path: '/svg',
      name: 'svg',
      component: () => import('../views/SvgView.vue'),
    },
    {
      path: '/border-gradient',
      name: 'border-gradient',
      component: () => import('../views/BorderGradientView.vue'),
    },
    {
      path: '/lottie-animation',
      name: 'lottie-animation',
      component: () => import('../views/LottieAnimationView.vue'),
    },
  ],
})

export default router
