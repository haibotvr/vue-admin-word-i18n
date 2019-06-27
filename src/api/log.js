import request from '@/utils/request'

export function selectLog(data) {
  return request({
    url: '/studyLog/findByPage',
    method: 'post',
    data
  })
}

export function selectLogByChapter(id) {
  return request({
    url: '/studyLog/findByChapter/' + id,
    method: 'get'
  })
}
