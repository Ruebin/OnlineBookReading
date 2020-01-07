/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-05 10:43:51
 * @LastEditTime : 2020-01-05 15:16:42
 * @LastEditors  : Ruebin
 */
import request from '../../axios/index'

export function comment(data) {
  return request({
    url: API_HOST + '/api/v1/book/comment',
    method: 'post',
    withCredentials: true,
    data: data
  })
}
