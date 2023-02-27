import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'main',
    // 路由懒加载
    component: () => import('../views/Main.vue'),
    // children: [
    //   {
    //     path: '/',
    //     name: 'home',
    //     component: () => import('../views/Home/Home.vue')
    //   },
    //   {
    //     path: '/user',
    //     name: 'user',
    //     component: () => import('../views/User/User.vue')
    //   },
    //   {
    //     path: '/mall',
    //     name: 'mall',
    //     component: () => import('../views/Mall/Mall.vue')
    //   },
    //   {
    //     path: '/page1',
    //     name: 'page1',
    //     component: () => import('../views/others/Page1.vue')
    //   },
    //   {
    //     path: '/page2',
    //     name: 'page2',
    //     component: () => import('../views/others/Page2.vue')
    //   }
    // ]
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router