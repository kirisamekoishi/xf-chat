import { fileURLToPath, URL } from 'node:url'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Inspect from 'vite-plugin-inspect'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],

      resolvers: [
        ElementPlusResolver(),
        
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],

    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),

        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],

    }),

    Icons({
      autoInstall: true,
    }),

    Inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
