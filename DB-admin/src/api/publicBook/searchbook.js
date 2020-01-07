/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-05 10:43:51
 * @LastEditTime : 2020-01-05 13:44:06
 * @LastEditors  : Ruebin
 */
import request from '../../axios/index'

export function searchbook(data) {
  return request({
    url: API_HOST + '/api/v1/book/search?keyword=' + data,
    method: 'get',
    withCredentials: true
  })
}
