import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/welcome/welcome.vue'
import HomeView from '@/views/home/HomeView.vue'
import accessEnum from "../access/accessEnum";
import {useUserStore} from "../store";
import checkAccess from "../access/checkAccess";

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
      meta: {
        access: accessEnum.USER
      },
    },
    
  ]
})

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (!userStore) {
        // 处理 userStore 未正确初始化的情况
        console.error('userStore未正确初始化');
        next(); // 保证调用 next
        return;
    }
    let loginUser = userStore?.loginUser;
    console.log("进入路由守卫");
    console.log(loginUser)
    console.log(!loginUser)
    console.log(!loginUser.userRole)
    // 如果没登录过 自动登录
    if (!loginUser || !loginUser.userRole) {
        console.log("去登录")
        // await 调用actions中的getLoginUser()
        await userStore.getLoginUser();
        loginUser = userStore?.loginUser;
        console.log("登录的用户角色", loginUser.userRole);
    }

    // 页面需要的权限
    const needAccess = (to.meta?.access) ?? accessEnum.NOT_LOGIN;
    console.log("页面需要的权限", needAccess);
    console.log(needAccess !== accessEnum.NOT_LOGIN)
    if (needAccess !== accessEnum.NOT_LOGIN) {
        // 如果没有登录，跳转到登录页
        if (!loginUser || !loginUser.userRole || loginUser.userRole === accessEnum.NOT_LOGIN) {
            next(`/login?redirect=${to.fullPath}`);
            return;
        }
        // 如果已经登录，权限不足跳转到无权限页
        if (!checkAccess(loginUser, needAccess)) {
            next("/noAuth");
            return;
        }
    }

    next(); // 有权限就跳转到下一个页面
});



export default router
