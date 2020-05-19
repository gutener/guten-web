// 配置编译环境和线上环境之间的切换
const env = process.env
const codeUrl = `${process.env.VUE_APP_API_BASE_URL}/code`
export {
  codeUrl,
  env
}
