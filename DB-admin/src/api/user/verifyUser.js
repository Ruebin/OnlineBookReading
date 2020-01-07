/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-05 19:15:39
 * @LastEditTime: 2020-01-05 19:23:01
 * @LastEditors: Ruebin
 */
import request from '../../axios/index'

export function verifyUser(data) {
  return request({
    url: API_HOST + '/api/v1/admin/verifyAdmin',
    method: 'get',
    withCredentials: true,
    data
  })
}
