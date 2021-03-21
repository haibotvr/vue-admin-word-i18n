import request from '@/utils/request'

export function createCall(data) {
  return request({
    url: '/call/add',
    method: 'post',
    data
  })
}

export function updateCall(data) {
  return request({
    url: '/call/edit',
    method: 'post',
    data
  })
}

export function delCall(id) {
  return request({
    url: '/call/del/' + id,
    method: 'get'
  })
}

export function selectCall(data) {
  return request({
    url: '/call/findByPage',
    method: 'post',
    data
  })
}

export function importContacts(data) {
  return request({
    url: '/call/importContacts',
    method: 'post',
    data
  })
}

export function exportContacts(data) {
  return request({
    url: '/call/exportContacts',
    method: 'post',
    data
  })
}

export function exportTargetContacts(data) {
  return request({
    url: '/call/exportTargetContacts',
    method: 'post',
    data
  })
}
