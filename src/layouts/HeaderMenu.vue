<template>
  <SlideMenu>
    <div class="gu-flexCenter" style="margin-bottom: 18px;">
      <div class="avatar">
        <img v-show="user.haveAvatar" :src="user.avatar" class="avatar-image" :alt="user.nick_name">
        <svg-icon v-show="!user.haveAvatar" iconClass="avtar-blue"></svg-icon>
      </div>
      <div class="gu-menu-user u-flex1">
        <div style="height: 22px;font-weight: 600;">{{user.nick_name}}</div>
        <a class="link" :href="user.url">{{user.user_name}}</a>
      </div>
    </div>
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
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'silder-menu',
    data() {
      return {
        user: {}
      }
    },
    components: {
      SlideMenu
    },
    created() {
      this.init()
    },
    methods: {
      ...mapActions(['Logout']),
      ...mapGetters(['userInfo']),
      init() {
        this.user = this.userInfo()
        this.user.user_name = `@${this.user.user_name}`
        this.user.url = `/u/${this.user.user_name}`
        this.user.haveAvatar = !!this.user.avatar
        console.log(this.user)
      },
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

  .avatar {
    display: block;
    white-space: nowrap;
    overflow: visible;
    text-overflow: ellipsis;
    line-height: normal;
    position: relative;
    .avatar-image{
      display: inline-block;
      vertical-align: middle;
      -webkit-border-radius: 100%;
      border-radius: 100%;
      width: 40px;
      height: 40px;
    }
  }
  .gu-menu-user{
    padding-left: 15px;
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    .link {
      color: rgb(255, 255, 255);
      font-size: 13px;
    }
  }
</style>