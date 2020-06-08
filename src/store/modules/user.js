import Vue from 'vue'
import {getInfo, login, logout, refreshToken, register} from '@/api/login'
import {ACCESS_TOKEN, EXPIRES_IN, REFRESH_TOKEN} from '@/store/mutation-types'
import {encryption} from '@/utils/util'
import {getUser} from "@/api/biz";

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: [],
    info:{}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, {name}) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        const user = encryption({
          data: userInfo,
          key: 'lukbuylukbuylukb',
          param: ['password']
        })
        login(user.username, user.password, user.code, user.randomStr).then(response => {
          const data = response
          Vue.ls.set(ACCESS_TOKEN, data.access_token)
          Vue.ls.set(REFRESH_TOKEN, data.refresh_token)
          Vue.ls.set(EXPIRES_IN, data.expires_in)
          Vue.ls.set('USER_NAME', user.username)
          commit('SET_TOKEN', data.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 刷新token
    RefreshToken({commit, state}) {
      return new Promise((resolve, reject) => {
        let currentToken = Vue.ls.get(REFRESH_TOKEN)
        refreshToken(currentToken).then(response => {
          const data = response
          Vue.ls.set(ACCESS_TOKEN, data.access_token)
          Vue.ls.set(REFRESH_TOKEN, data.refresh_token)
          Vue.ls.set(EXPIRES_IN, data.expires_in)
          commit('SET_TOKEN', data.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({commit}) {
      return new Promise((resolve, reject) => {
        const userName = Vue.ls.get('USER_NAME')
        getUser(userName).then(response => {
          const result = response
          console.log(`current user:${result.user_name}`)
          result.roles=[17]
          commit('SET_INFO', result)
          commit('SET_ROLES', result.roles)
          // if (result.roles && result.roles.length > 0) {
          //   const role = result.roles
          //   role.permissions = result.permissions
          //   role.permissions.map(per => {
          //     if (typeof per === Object && per.actionEntitySet !== null && per.actionEntitySet.length > 0) {
          //       per.actionList = per.actionEntitySet.map(action => {
          //         return action.action
          //       })
          //     }
          //   })
          //   // role.permissionList = role.permissions.map(permission => { return permission.permissionId })
          //   role.permissionList = role.permissions
          //   commit('SET_INFO', result)
          //   commit('SET_ROLES', result.roles)
          // } else {
          //   reject(new Error('getInfo: roles must be a non-null array !'))
          // }
          commit('SET_NAME', {name: result.user_name})
          commit('SET_AVATAR', result.avatar)
          resolve(response)
        }).catch(error => {
          console.error(error)
          reject(error)
        })
      })
    },
    // 登出
    Logout({commit, state}) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.remove(REFRESH_TOKEN)
        Vue.ls.remove(EXPIRES_IN)
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },

    Register({commit}, userInfo) {
      userInfo.role=[17]
      return new Promise((resolve, reject) => {
        register(userInfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
