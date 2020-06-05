const api = {
  Login: '/auth/oauth/token',//'/auth/login',
  Logout: '/auth/token/logout',//'/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/admin/user/v1/register',//'/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  // UserInfo: '/user/info',
  UserInfo: '/admin/user/v1/info'
}
export default api
