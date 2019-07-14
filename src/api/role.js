import request from '@/utils/request'

export function createRole(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/role/edit',
    method: 'post',
    data
  })
}

export function delRole(id) {
  return request({
    url: '/role/del/' + id,
    method: 'get'
  })
}

export function selectRole(data) {
  return request({
    url: '/role/findByPage',
    method: 'post',
    data
  })
}

export function findRoles() {
  return request({
    url: '/role/findRoles',
    method: 'post'
  })
}
