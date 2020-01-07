/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-03 22:09:57
 * @LastEditTime : 2020-01-04 16:28:36
 * @LastEditors  : Ruebin
 */
import request from '../../axios/index'

export function login(data) {
  return request({
    url: API_HOST + '/api/v1/admin/login',
    method: 'post',
    withCredentials: true,
    data
  })
}
