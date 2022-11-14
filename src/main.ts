import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import * as Icons from '@element-plus/icons-vue'

// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

const app = createApp(App)
app.use(store).use(router).use(ElementPlus).mount('#app')
// 注册全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
  })