/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-05 10:43:51
 * @LastEditTime : 2020-01-05 15:12:21
 * @LastEditors  : Ruebin
 */
import request from '../../axios/index'

export function allcomment(data) {
  return request({
    url: API_HOST + '/api/v1/book/comment?book_id=' + data,
    method: 'get',
    withCredentials: true
  })
}
