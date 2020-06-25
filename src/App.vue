<template>
  <a-config-provider :locale="locale">
    <div id="root" style="height:100%">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'

  export default {
    data () {
      return {
        locale: zhCN,
        mobile:false,
      }
    },
    mounted () {
      let mobile= navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      mobile
          ?document.body.classList.add('mobile')
          :document.body.classList.remove('mobile')

      const { $store } = this
      deviceEnquire(deviceType => {
        switch (deviceType) {
          case DEVICE_TYPE.DESKTOP:
            $store.commit('TOGGLE_DEVICE', 'desktop')
            $store.dispatch('setSidebar', true)
            break
          case DEVICE_TYPE.TABLET:
            $store.commit('TOGGLE_DEVICE', 'tablet')
            $store.dispatch('setSidebar', false)
            break
          case DEVICE_TYPE.MOBILE:
          default:
            $store.commit('TOGGLE_DEVICE', 'mobile')
            $store.dispatch('setSidebar', true)
            break
        }
      })
    },
  }
</script>

