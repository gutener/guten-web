import { axios } from '@/utils/request'

export function getStory(artNo) {
  return axios({
    url: `/story/v1/${artNo}`,
    method: 'get'
  })
}