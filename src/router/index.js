import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/welcome/welcome.vue'
import HomeView from '@/views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      redirect: 'login',
      component: Welcome,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/login/login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/register/register.vue')
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    
  ]
})

export default router
