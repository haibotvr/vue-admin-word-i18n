import request from '@/utils/request'

export function selectLog(data) {
  return request({
    url: '/studyLog/findByPage',
    method: 'post',
    data
  })
}
