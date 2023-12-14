import './assets/main.css'

import { createApp } from 'vue'

// 引入pinia状态管理
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

// 引入路由
import router from '@/router'
import '@/permission'

import 'element-plus/dist/index.css' // 引入element-plus组件框架、el-icon

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
pinia.use(piniaPluginPersist)

app.mount('#app')
