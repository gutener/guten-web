<template>
  <SlideMenu>
    <a href="/rexwong626">
      <svg-icon iconClass="avtar-blue"></svg-icon>
      <span>wyp</span>
    </a>
    <a href="/channels">
      <svg-icon iconClass="channel"></svg-icon>
      <span>频道</span>
    </a>
    <a href="/settings">
      <svg-icon iconClass="settings" style="font-size: 26px;margin-left: -5px;"></svg-icon>
      <span>设置</span>
    </a>
    <a href="/help">
      <svg-icon iconClass="help" style="font-size: 23px;margin-left: -4px;"></svg-icon>
      <span>帮助</span>
    </a>
    <a href="javascript:;" @click="handleLogout">
      <svg-icon iconClass="logout" style="font-size: 23px;margin-left: -4px;"></svg-icon>
      <span>退出</span>
    </a>
    <div class="menu-bottom">
      <div class="bottom-fixed">
        <span>guten,inc</span>
      </div>
    </div>
  </SlideMenu>
</template>

<script>
  import SlideMenu from '@/components/g-menu/SlideMenu'
  import {mapActions} from 'vuex'

  export default {
    name: 'silder-menu',
    data() {
      return {}
    },
    components: {
      SlideMenu
    },
    methods: {
      ...mapActions(['Logout']),
      handleLogout() {
        const that = this
        return that.Logout({}).then(() => {
          window.location.reload()
        }).catch(err => {
          that.$message.error({
            title: '错误',
            description: err.message
          })
        })
      }
    }
  }
</script>
<style lang="less">
  .AppHeader-menu {
    a {
      display: inline-block;
      width: 15em;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 800;
      border-top-left-radius: 20px 50px;
      border-top-right-radius: 20px 50px;
      border-bottom-right-radius: 20px 50px;
      border-bottom-left-radius: 20px 50px;
      cursor: pointer;

      &.currentDemo {
        background: #c94e50;
        color: #fffce1;
      }
    }
  }

  .menu-bottom {
    top: unset;
    z-index: 2;
    position: sticky;
    bottom: 0px;
    background-color: inherit;

    .bottom-fixed {

    }
  }
</style>