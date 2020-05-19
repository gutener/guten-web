import Vue from 'vue'
import { login, refreshToken, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, REFRESH_TOKEN, EXPIRES_IN } from '@/store/mutation-types'
import { encryption } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name }) => {
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
    Login ({ commit }, userInfo) {
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
          commit('SET_TOKEN', data.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 刷新token
    RefreshToken ({ commit, state }) {
      return new Promise((resolve, reject) => {
        let refreshToken = Vue.ls.get(REFRESH_TOKEN)
        refreshToken(refreshToken).then(response => {
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
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.data
          if (result.roles && result.roles.length > 0) {
            const role = result.roles
            role.permissions = result.permissions
            role.permissions.map(per => {
              if (typeof per === Object && per.actionEntitySet !== null && per.actionEntitySet.length > 0) {
                let action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            // role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            role.permissionList = role.permissions
            commit('SET_ROLES', result.roles)
            commit('SET_INFO', result.sysUser)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.sysUser.username })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          console.error(error)
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
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
    }

  }
}

export default user
