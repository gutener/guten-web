import Vue from 'vue'
import VueStorage from 'vue-ls'
// import { loadStyle } from '@/utils/util'
import * as urls from '@/config/env'

// base library

// ext library
import VueClipboard from 'vue-clipboard2'
// import PermissionHelper from '@/utils/helper/permission'

import '@/icons' // svg 图标
// TODO antv目前只有登录页面用到，以后删除掉
import 'ant-design-vue/dist/antd.css';
import { Popover,ConfigProvider,Skeleton,Form,Button,Input,Tabs,Row,Col,Icon,Checkbox,Select,Progress } from 'ant-design-vue';
import '@/components/global.less'

Vue.use(Popover);
Vue.use(ConfigProvider);
Vue.use(Skeleton);
Vue.use(Input);
Vue.use(Button);
//login page
Vue.use(Form);
Vue.use(Tabs);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Progress);
//---end

// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})

Vue.use(VueStorage)
Vue.use(VueClipboard)
// Vue.use(PermissionHelper)
