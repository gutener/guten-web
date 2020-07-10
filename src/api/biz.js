import {axios} from '@/utils/request'

export function getItemById(id,params) {
  return axios({
    url: `/item/1.0/item/${id}`,
    method: 'get',
    params:params
  })
}

export function postItem(obj) {
  return axios({
    url: '/item/1.0/item/save',
    method: 'put',
    data: obj
  })
}
export function postShotText(obj) {
  return axios({
    url: '/item/1.0/short_text/save',
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
export function queryItemsByCurrentUser(page) {
  return axios({
    url: `/cds/1.0/items/by_user`,
    params: page,
    method: 'get'
  })
}
export function seedReply(replyId) {
  return axios({
    url: `/seed/1.0/reply/${replyId}`,
    method: 'post'
  })
}

export function listReliesByItem(params) {
  return axios({
    url: `/item/1.0/list-by-item`,
    method: 'get',
    params: params,
  })
}

export function seedItem(itemId) {
  return axios({
    url: `/seed/1.0/item/${itemId}`,
    method: 'post'
  })
}
export function seededHistoryByUser(userName,page) {
  return axios({
    url: `/seed/1.0/${userName}/seeded-history`,
    method: 'get',
    params: page,
  })
}
export function seedingHistoryByUser(userName,page) {
  return axios({
    url: `/seed/1.0/${userName}/seeding-history`,
    method: 'get',
    params: page,
  })
}

export function querytags(tagName) {
  return axios({
    url: `/tags/1.0/query`,
    params: tagName,
    method: 'get'
  })
}
export function queryItemByTag(tagName) {
  return axios({
    url: `/tags/1.0/items`,
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
    url: `/item/1.0/bookmark`,
    params: params,
    method: 'put'
  })
}

export function listBookmark(param) {
  return axios({
    url: `/item/1.0/bookmark/list`,
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
export function postImage(obj) {
  return axios({
    url: '/item/1.0/image/save',
    method: 'put',
    data: obj
  })
}