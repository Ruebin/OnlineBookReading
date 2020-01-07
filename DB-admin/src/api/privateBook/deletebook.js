/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-05 12:29:22
 * @LastEditTime: 2020-01-05 12:30:31
 * @LastEditors: Ruebin
 */
import request from '../../axios/index'

export function deletebook(data) {
  return request({
    url: API_HOST + '/api/v1/book',
    method: 'delete',
    withCredentials: true,
    data: data
  })
}
