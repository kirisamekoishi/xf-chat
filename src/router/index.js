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
      component: HomeView,
      redirect: '/xunfei-chat',
      children: [
        {
          path: '/xunfei-chat',
          name: 'xunfei-chat',
          component: () => import('@/views/home/components/xunFeiChat.vue')
        },
        // 嵌套用户的聊天历史记录id，实现跳转路由
      ]
    },
    
  ]
})

export default router
