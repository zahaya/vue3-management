import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import './style.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/css/index.css'
import store from './store/index.js'
import './api/mock.js'




const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

store.commit("addMenu", router);


// 全局路由守卫
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {   //如果token存在 说明用户登录 直接跳转首页
    next('/home')
  } else {
    next()
  }
})

app.use(router).use(store)
// app.use(ElementPlus)
app.mount('#app')
