import router from '@/router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

// 不显示环形进度动画
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 路由跳转前
router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()
  // 设置页面标题
  // document.title = to.meta.title
  document.title = '讯飞星火chat'

  // 如果没有token则直接回退到登录页面
  // if (to.path === '/login') return next()
  // const token = sessionStorage.getItem('token')
  // if (!token) return next('/login')

  // 请求菜单、用户信息 addRoutes(res.result.menu)
//   if (to.path === '/scheduling-page/ssoAuth' && to.query.code) {}
  
  next()
})

// 路由跳转后
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

// 处理页面空白chunk load failed
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
    window.location.reload()
  } else {
    console.log('error', error)
  }
})
