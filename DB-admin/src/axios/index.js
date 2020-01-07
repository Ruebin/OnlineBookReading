/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-05 19:15:40
 * @LastEditTime: 2020-01-06 12:23:02
 * @LastEditors: Ruebin
 */
import axios from 'axios'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.API_HOST,
  timeout: 10000000 // 请求超时时间
})

// 请求拦截器
// service.interceptors.request.use(
//   config => {
//     // 在请求发送之前做一些处理
//     return config
//   },
//   error => {
//     // 发送失败
//     console.log(error)
//     Promise.reject(error)
//   }
// )

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return {
        status: response.status,
        msg: response.data
      }

    }
  },
  error => {
    // console.log(error.response)
    if (error && error.response) {
      return {
        status: error.response.status,
        msg: error.response.data.msg
      }
      // switch (error.response.status) {
      //   case 400: error.message = '请求错误'; break
      //   case 401: error.message = '未授权，请登录'; break
      //   case 403: error.message = '拒绝访问'; break
      //   case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
      //   case 408: error.message = '请求超时'; break
      //   case 500: error.message = '服务器内部错误'; break
      //   case 501: error.message = '服务未实现'; break
      //   case 502: error.message = '网关错误'; break
      //   case 503: error.message = '服务不可用'; break
      //   case 504: error.message = '网关超时'; break
      //   case 505: error.message = 'HTTP版本不受支持'; break
      //   default: break
      // }
    }
  }
)

export default service
