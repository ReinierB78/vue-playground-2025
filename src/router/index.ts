import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiresAuth: false,
        location: ['navbar', 'footer']
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: true,
        location: ['navbar', 'footer']
      }
    },
    // {
    //   path: '/buy-product',
    //   name: 'buyProduct',
    //   component: () => import('../views/BuyProduct.vue'),
    //   meta: {
    //     location: ['navbar', 'footer']
    //   }
    // },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        location: ['footer']
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      meta: {
        location: ['footer']
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresAuth: false,
        location: ['navbar-extra']
      }
    }
  ]
})

export default router
