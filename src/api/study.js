import request from '@/utils/request'

export function addStudy(data) {
  return request({
    url: '/study/add',
    method: 'post',
    data
  })
}

export function addStudyLog(data) {
  return request({
    url: '/study/addLog',
    method: 'post',
    data
  })
}

export function selectWords(id) {
  return request({
    url: '/study/findWords/' + id,
    method: 'get'
  })
}

export function reStudy(id) {
  return request({
    url: '/study/reStudy/' + id,
    method: 'get'
  })
}

export function selectWordDetail(id) {
  return request({
    url: '/study/findWordDetail/' + id,
    method: 'get'
  })
}

export function review(data) {
  return request({
    url: '/study/findByPage',
    method: 'post',
    data
  })
}
