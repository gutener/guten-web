import Vue from 'vue'
import VueStorage from 'vue-ls'
// import { loadStyle } from '@/utils/util'
import * as urls from '@/config/env'
// ext library
import VueClipboard from 'vue-clipboard2'
import '@/icons' // svg 图标
// TODO antv目前只有登录页面用到，以后删除掉
import 'ant-design-vue/lib/button/style'
import 'ant-design-vue/lib/popover/style'
import 'ant-design-vue/lib/config-provider/style'
import 'ant-design-vue/lib/skeleton/style'
import 'ant-design-vue/lib/input/style'
import 'ant-design-vue/lib/form/style'
import 'ant-design-vue/lib/tabs/style'
import 'ant-design-vue/lib/row/style'
import 'ant-design-vue/lib/col/style'
import 'ant-design-vue/lib/icon/style'
import 'ant-design-vue/lib/checkbox/style'
import 'ant-design-vue/lib/select/style'
import 'ant-design-vue/lib/progress/style'
import 'ant-design-vue/lib/modal/style'
import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Form,
  Icon,
  Input,
  Modal,
  Popover,
  Progress,
  Row,
  Select,
  Skeleton,
  Tabs
} from 'ant-design-vue'

// base library
// import PermissionHelper from '@/utils/helper/permission'

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
Vue.use(Modal);
//---end

// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})

Vue.use(VueStorage)
Vue.use(VueClipboard)
// Vue.use(PermissionHelper)
