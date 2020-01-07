import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import Video from 'video.js'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'mavon-editor/dist/css/index.css'
import '@/assets/css/normalize.css'
import 'iview/dist/styles/iview.css'
import VueCalendarHeatmap from 'vue-calendar-heatmap'
import Echarts from 'echarts'
Vue.prototype.$echarts = Echarts;
Vue.use(Echarts)
Vue.use(VueVideoPlayer)
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueCalendarHeatmap)
// Vue.component('calendarHeatmap', CalendarHeatmap)

// 设置请求超时时间
axios.defaults.timeout = 5000
Vue.prototype.$video = Video
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
