import { axios } from '@/utils/request'

export function getStory(id,from) {
  return axios({
    url: `/story/1.0/${id}`,
    method: 'get',
    headers: {
      source:from
    },
  })
}
export function postStory(obj) {
  return axios({
    url: '/story/1.0',
    method: 'put',
    data: obj
  })
}
export function homeFeed(page) {
  return axios({
    url: `/cds/1.0/home-stream`,
    params: page,
    method: 'get'
  })
}
export function userSeed(page) {
  return axios({
    url: `/cds/1.0/user-seeded-list`,
    params: page,
    method: 'get'
  })
}
export function postReply(obj) {
  return axios({
    url: '/reply/1.0',
    method: 'put',
    data: obj
  })
}
export function seedReply(replyId) {
  return axios({
    url: `/seed/1.0/${replyId}/reply`,
    method: 'post'
  })
}
export function listReliesByStory(params) {
  return axios({
    url: `/reply/1.0/list-by-story`,
    method: 'get',
    params: params,
  })
}
export function seedStory(storyId) {
  return axios({
    url: `/seed/1.0/${storyId}/story`,
    method: 'post'
  })
}
export function querytags(tagName) {
  return axios({
    url: `/tags/1.0/query`,
    params: tagName,
    method: 'get'
  })
}
export function postUser(obj) {
  return axios({
    url: '/users/1.0/save',
    method: 'put',
    data: obj
  })
}
export function updateUser(obj) {
  return axios({
    url: '/users/1.0/update',
    method: 'post',
    data: obj
  })
}
export function getUser(userName) {
  return axios({
    url: `/users/1.0/${userName}`,
    method: 'get'
  })
}
export function follow(userid) {
  return axios({
    url: `/users/1.0/follow/${userid}/follow`,
    method: 'post'
  })
}
export function unfollow(userid) {
  return axios({
    url: `/users/1.0/follow/${userid}/unfollow`,
    method: 'post'
  })
}