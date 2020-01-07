/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-08 12:37:08
 * @LastEditTime : 2020-01-04 18:21:31
 * @LastEditors  : Ruebin
 */
import request from '../../axios/index'

export function bookinfo() {
  return request({
    url: API_HOST + '/api/v1/book/private',
    method: 'get',
    withCredentials: true
  })
}

