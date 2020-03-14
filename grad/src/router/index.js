import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Home from '../page/home/Home.vue'
import allClass from '../page/allClass/allClass.vue'
import classIntro from '../page/allClass/classIntro.vue'

import axios from '../common/axios'
import menu from './menu'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        ifNav: true
      }
    }, {
      path: '/allClass',
      name: 'All',
      component: allClass,
      meta: {
        ifNav: true
      }
    }, {
      path: '/classIntro',
      name: 'classInro',
      component: classIntro,
      meta: {
        ifNav: true
      }
    }
  ]
})

// 在切换路由的时候检验用户是否已登陆
router.beforeEach((to, from, next) => {
  // 判断要去的路由有没有requiresAuth
  if (to.path !== '/' && to.path !== '/allClass' && to.path !== '/classIntro') {
    const token = window.localStorage.getItem('token')
    if (token) {
      axios.getAuth()
      .then(({ data }) => {
        if (data.code === 200) {
          if (!store.state.ifaddRoute) {
            router.addRoutes(menu)
            store.dispatch('ChangeRoute', true)
          }    
          next()
        } else {
          next({
            path: '/'
          })
        }
      })
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
