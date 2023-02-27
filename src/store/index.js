import { createStore } from 'vuex'
import Cookies from 'js-cookie'

export default createStore({
  state: {
    isCollapse: true,
    // 面包屑
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ],
    menu: [],
    token: ''
  },
  mutations: {
    updateIsCollapse(state, payload) {
      state.isCollapse = !state.isCollapse
    },

    selectMenu(state, val) {
      // 判断面包屑中是否已经存在val.name
      const index = state.tabList.findIndex(item => item.name === val.name)
      if (index === -1) {
        state.tabList.push(val)
      }
    },

    // 删除指定的 tag 数据
    closeTag(state, val) {
      const index = state.tabList.findIndex(item => item.name === val.name)
      state.tabList.splice(index, 1)
    },

    setMent(state, val) {
      state.menu = val
      // 本地化存储
      localStorage.setItem('menu', JSON.stringify(val))
    },

    // vuex无法持久化存储数据 刷新后数据消失
    addMenu(state, router) {
      // 如果本地获取不到menu数据
      if (!localStorage.getItem('menu')) {
        return
      }
      // 重新赋值给menu 本地数据为JSON 转成对象形式   在main.js中直接调用
      const menu = JSON.parse(localStorage.getItem('menu'))
      state.menu = menu

      // 动态路由
      const modules = import.meta.glob('../views/*/*.vue')
      const menuArr = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            let url = `../views/${item.url}.vue`
            item.component = modules[url]
            return item
          })
          menuArr.push(...item.children)
        } else {
          let url = `../views/${item.url}.vue`
          item.component = modules[url]
          menuArr.push(item)
        }
        menuArr.forEach(item => {
          router.addRoute('main', item)
        })
      })
    },

    // 退出清除menu
    clearMenu(state) {
      state.menu = []
      localStorage.removeItem('menu')
    },

    setToken(state, val) {
      state.token = val
      Cookies.set('token', val)
    },

    clearToken(state) {
      state.token = ''
      Cookies.remove('token')
    },

    getToken(state) {
      state.token = state.token || Cookies.get('token')
    }
  }
})
