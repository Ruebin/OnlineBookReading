import request from '../../axios/index'

export function userMsg(data) {
  return request({
    url: API_HOST + '/api/v1/userMsg',
    method: 'get',
    withCredentials: true,
    data
  })
}
