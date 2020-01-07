/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-05 10:43:51
 * @LastEditTime: 2020-01-05 10:44:54
 * @LastEditors: Ruebin
 */
import request from '../../axios/index'

export function allbook() {
  return request({
    url: API_HOST + '/api/v1/book/public',
    method: 'get',
    withCredentials: true
  })
}
