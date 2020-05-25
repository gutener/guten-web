import { axios } from '@/utils/request'

export function getStory(id) {
  return axios({
    url: `/story/v1/${id}`,
    method: 'get'
  })
}
export function postStory(obj) {
  return axios({
    url: '/story/v1',
    method: 'post',
    data: obj
  })
}
export function cdsHp() {
  return axios({
    url: `/story/recommend/v1/hotstory`,
    method: 'get'
  })
}
export function postReply(obj) {
  return axios({
    url: '/story/reply/v1',
    method: 'post',
    data: obj
  })
}
export function listReliesByStory(storyId) {
  return axios({
    url: `/story/reply/v1/${storyId}/list-by-story`,
    method: 'get'
  })
}