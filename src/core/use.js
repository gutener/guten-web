import Vue from 'vue'
import VueStorage from 'vue-ls'
// import { loadStyle } from '@/utils/util'
import * as urls from '@/config/env'

// base library
// TODO antv目前只有登录页面用到，以后删除掉
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
// ext library
import VueClipboard from 'vue-clipboard2'
// import PermissionHelper from '@/utils/helper/permission'

import '@/icons' // svg 图标

// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})

Vue.use(Antd)
Vue.use(VueStorage)
Vue.use(VueClipboard)
// Vue.use(PermissionHelper)
// Vue.use(VueCropper)
// Vue.use(Popover)
