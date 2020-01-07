/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-08 12:37:08
 * @LastEditTime : 2020-01-05 20:09:04
 * @LastEditors  : Ruebin
 */
import request from '../../axios/index'

export function changebook(data) {
  return request({
    url: API_HOST + '/api/v1/book',
    method: 'put',
    withCredentials: true,
    data: data
  })
}

