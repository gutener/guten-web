<template>
  <header class="main-layout align-items-end flex-grow1">
    <div class="main-layout gu-header-width">
      <div class="main-layout height100 position-flex">
        <div class="main-layout height100 justify-between gu-header-width" style="overflow-y: auto;">
          <div class="main-layout align-items-start">
            <div class="main-layout">
              <a href="/" aria-label="Guten">
                <svg-icon iconClass="g-logo" style="font-size: 38px;"></svg-icon>
              </a>
            </div>
            <div class="main-layout header-menu-options">
              <nav class="main-layout align-items-start">
                <router-link class="flex-grow1 header-menu-option align-items-start" to="/">
                  <div class="menu-option-body">
                    <svg-icon iconClass="home" class="" style="font-size:22px"></svg-icon>
                    <div class="menu-option-title"><span>主页</span></div>
                  </div>
                </router-link>
                <router-link class="flex-grow1 header-menu-option align-items-start" to="/explore">
                  <div class="menu-option-body">
                    <svg-icon iconClass="hash" class="" style="font-size:23px"></svg-icon>
                    <div class="menu-option-title"><span>频道</span></div>
                  </div>
                </router-link>
                <router-link class="flex-grow1 header-menu-option align-items-start" to="/notifications">
                  <div class="menu-option-body">
                    <svg-icon iconClass="notification" class="" style="font-size:22px"></svg-icon>
                    <div class="menu-option-title"><span>消息</span></div>
                  </div>
                </router-link>
                <router-link class="flex-grow1 header-menu-option align-items-start" to="/bookmarks">
                  <div class="menu-option-body">
                    <svg-icon iconClass="bookmark" class="" style="font-size:22px"></svg-icon>
                    <div class="menu-option-title"><span>书签</span></div>
                  </div>
                </router-link>
                <router-link class="flex-grow1 header-menu-option align-items-start" :to="`/u/${userInfo().user_name}`">
                  <div class="menu-option-body">
                    <svg-icon iconClass="user" class="" style="font-size:22px"></svg-icon>
                    <div class="menu-option-title"><span>个人资料</span></div>
                  </div>
                </router-link>
              </nav>
            </div>
            <div class="main-layout post-story-button">
              <a class="main-layout post-story" aria-label="Create Post" href="/new-story">
                <span class="button-span">
                  发文
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        userUrl: ''
      };
    },
    created() {
      this.render()
    },
    methods:{
      ...mapGetters(['userInfo']),
      render(){
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url('../components/global.less');

  .header-action-options {
    margin-top: 2px;
    margin-bottom: 5px;
    width: 100%;
  }

  .post-story {
    margin-bottom: 5px;
    margin-top: 5px;
    min-height: 49px;
    min-width: calc(78.89px);
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 999px;
    background-color: rgb(23, 191, 99);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 28px;
  }

  .post-story-button {
    width: 90%
  }

  .button-span {
    color: #fafafa;
    font-size: 1rem;
    font-weight: 600;
    line-height: 49px;
    margin: 0 auto;
  }
</style>
