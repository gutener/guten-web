import {axios} from '@/utils/request'

export function getStory(id, from) {
  return axios({
    url: `/story/1.0/story/${id}`,
    method: 'get',
    headers: {
      source: from
    },
  })
}

export function postStory(obj) {
  return axios({
    url: '/story/1.0/story',
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
export function queryTagTrend(page) {
  return axios({
    url: `/tags/1.0/tag_trend`,
    params: page,
    method: 'get'
  })
}
export function queryStoryByName(page) {
  return axios({
    url: `/tags/1.0/stories`,
    params: page,
    method: 'get'
  })
}
export function checkFollowtag(tagId) {
  return axios({
    url: `/tags/1.0/have_followed`,
    params: tagId,
    method: 'get'
  })
}

export function postUser(obj) {
  return axios({
    url: '/users/1.0/profile/save',
    method: 'put',
    data: obj
  })
}

export function updateUser(obj) {
  return axios({
    url: '/users/1.0/profile/update',
    method: 'post',
    data: obj
  })
}

export function getUser(userName) {
  return axios({
    url: `/users/1.0/profile/${userName}`,
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

export function addBookmark(params) {
  return axios({
    url: `/story/1.0/bookmark`,
    params: params,
    method: 'put'
  })
}

export function listBookmark(param) {
  return axios({
    url: `/story/1.0/bookmark/list`,
    method: 'get',
    params: param
  })
}

export function notifications(page) {
  return axios({
    url: `/notification/1.0/notifs`,
    method: 'get',
    params: page
  })
}