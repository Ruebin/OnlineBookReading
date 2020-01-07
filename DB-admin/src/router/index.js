/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-08 12:37:08
 * @LastEditTime : 2020-01-05 20:04:57
 * @LastEditors  : Ruebin
 */
import Vue from 'vue'
import Router from 'vue-router'
import router from '@/router'
import Vuex from 'vuex'
import { verifyUser } from '../api/user/verifyUser'
import store from '../store/index.js'
Vue.use(Router)
Vue.use(Vuex)

export const routesArr = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/public/Login.vue')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('../components/public/Index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        text: '管理电子书',
        component: () => import('../views/book/managebook.vue')
      },
      {
        path: '/home/manage',
        name: 'manage',
        text: '管理电子书',
        component: () => import('../views/book/managebook.vue')
      },
      {
        path: '/home/addbook',
        name: 'add',
        text: '上传电子书',
        component: () => import('../components/privateBook/mybook/addbook.vue')
      },
      {
        path: '/home/changebook',
        name: 'change',
        text: '修改电子书',
        component: () => import('../components/privateBook/mybook/changebook.vue')
      },
      {
        path: 'book/:book_id/bookinfo',
        name: 'bookinfo',
        text: '图书详情',
        component: () => import('../views/book/bookinfo.vue')
      },
      {
        path: 'book/:book_id/bookinfo/readbook',
        name: 'book',
        text: '图书阅读',
        component: () => import('../components/public/readbook.vue')
      }
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../components/public/Error.vue')
  },

  { path: '*', redirect: '/error' }
]

export default new Router({
  // mode: 'history',
  routes: routesArr
})


/* 路由拦截*/
router.beforeEach((to, from, next) => {
  verifyUser().then(res => {
    if (res.status === 200) {
      // 必须是字符串，bool值会被转换成字符串存在localStorage
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('userImg', '@/assets/imgs/user.jpg');
      localStorage.setItem('userName', res.msg.admin_name);
    } else {
      localStorage.setItem('isLogin', 'false');
      localStorage.setItem('userImg', '');
      localStorage.setItem('userName', '');
    }
  })
  to.path.match('/home/book')
    ? store.state.isLearningPage = true
    : store.state.isLearningPage = false;

  if (localStorage.isLogin === 'true') {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

