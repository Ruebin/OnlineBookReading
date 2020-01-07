/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-03 22:09:57
 * @LastEditTime: 2020-01-04 16:38:44
 * @LastEditors: Ruebin
 */
import request from '../../axios/index'

export function logout(data) {
  return request({
    url: API_HOST + '/api/v1/admin/logout',
    method: 'get',
    withCredentials: true,
    data
  })
}
