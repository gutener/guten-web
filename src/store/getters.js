const getters = {
  access_token: state => state.user.access_token,
  refresh_token: state => state.user.refresh_token,
  expires_in: state => state.user.expires_in,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles,
}
export default getters
