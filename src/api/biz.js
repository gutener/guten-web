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
export function homeFeed(page) {
  return axios({
    url: `/story/v1/home-feed`,
    params: page,
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
export function seedReply(replyId) {
  return axios({
    url: `/story/seed/v1/reply/${replyId}`,
    method: 'post'
  })
}
export function listReliesByStory(params) {
  return axios({
    url: `/story/reply/v1/list-by-story`,
    method: 'get',
    params: params,
  })
}
export function seedStory(storyId) {
  return axios({
    url: `/story/seed/v1/story/${storyId}`,
    method: 'post'
  })
}
export function querytags(tagName) {
  return axios({
    url: `/story/hash_tag/v1/query`,
    params: tagName,
    method: 'get'
  })
}
export function postUser(obj) {
  return axios({
    url: '/story/user/v1',
    method: 'post',
    data: obj
  })
}
export function updateUser(obj) {
  return axios({
    url: '/story/user/v1/update',
    method: 'post',
    data: obj
  })
}
export function getUser(userName) {
  return axios({
    url: `/story/user/v1/${userName}`,
    method: 'get'
  })
}
export function follow(userid) {
  return axios({
    url: `/story/follow/v1/${userid}/follow`,
    method: 'post'
  })
}
export function unfollow(userid) {
  return axios({
    url: `/story/follow/v1/${userid}/unfollow`,
    method: 'post'
  })
}