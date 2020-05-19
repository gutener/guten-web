import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
const scope = 'server'
export function login (username, password, code, randomStr) {
  const grant_type = 'password'
  return axios({
    url: '/auth/oauth/token',
    method: 'post',
    headers: {
      isToken: false,
      'TENANT-ID': '1',
      'Authorization': 'Basic bHVrYnV5Omx1a2J1eQ=='
    },
    params: { username, password, randomStr, code, grant_type, scope }
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    url: '/admin/user/v1/info',
    method: 'get'
  })
}

export function logout () {
  return axios({
    url: '/auth/token/logout',
    method: 'delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
export const refreshToken = (refresh_token) => {
  const grant_type = 'refresh_token'
  return axios({
    url: '/auth/oauth/token',
    headers: {
      'isToken': false,
      'TENANT-ID': '1',
      'Authorization': 'Basic bHVrYnV5Omx1a2J1eQ=='
    },
    method: 'post',
    params: { refresh_token, grant_type, scope }
  })
}