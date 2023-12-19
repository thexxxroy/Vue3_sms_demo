import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import './assets/css/reset.Less'
import './assets/css/common.Less'

import router from './router'
import pinia from './pinia'
import useLoginStore from './pinia/login/login'

//全局注册element-plus图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)

//刷新页面加载数据
const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()

app.use(router)
app.mount('#app')
