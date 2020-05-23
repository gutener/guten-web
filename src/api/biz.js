import { axios } from '@/utils/request'

export function getStory(artNo) {
  return axios({
    url: `/story/v1/${artNo}`,
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
    url: `/story/v1/hotstory`,
    method: 'get'
  })
}