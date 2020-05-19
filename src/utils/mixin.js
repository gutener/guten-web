import { DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'
const mixin = {
  computed: {
    ...mapState({
      layoutMode: state => state.app.layout,
      contentWidth: state => state.app.contentWidth,
    })
  },
  methods: {

  }
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}
export { mixin, mixinDevice }
