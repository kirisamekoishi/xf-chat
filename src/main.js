import './assets/main.css'
import '@/assets/fonts/iconfont.css'
import { createApp } from 'vue'

// 引入pinia状态管理
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

// 引入路由
import router from '@/router'
import '@/permission'

import 'element-plus/dist/index.css' // 引入element-plus组件框架、el-icon

// 全局引入el-icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

const pinia = createPinia()

app.use(router)
app.use(pinia)
pinia.use(piniaPluginPersist)

app.mount('#app')
