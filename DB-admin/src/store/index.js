/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-03 22:09:57
 * @LastEditTime : 2020-01-05 11:26:29
 * @LastEditors  : Ruebin
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 左侧菜单栏数据
    menuItems: [
      {
        name: 'home', // 要跳转的路由名称 不是路径
        size: 20, // icon大小
        type: 'md-home', // icon类型
        text: '个人主页' // 文本内容
      },
      {
        name: 'publicbook',
        size: 20,
        text: '公共图书馆',
        type: 'ios-list-box-outline'
      }
    ],
    userData: {
      userName: '',
      userImage: require('@/assets/imgs/user.jpg'),
      isLogin: ''
    },
    bookinfo: {
      book_id: 0,
      book_name: '',
      book_address: '',
      author: '',
      press: '',
      type: '',
      belong: '',
      comment_num: 0
    },
    apply: {
      apply_id: 0,
      project_id: 0
    },
    isLearningPage: false
  },
  mutations: {
    setMenus(state, items) {
      state.menuItems = [...items]
    }
  },
  actions: {}
})

export default store
