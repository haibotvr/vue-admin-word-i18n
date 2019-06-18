import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function createUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

export function delUser(id) {
  return request({
    url: '/user/del/' + id,
    method: 'get'
  })
}

export function selectUser(data) {
  return request({
    url: '/user/findByPage',
    method: 'post',
    data
  })
}
