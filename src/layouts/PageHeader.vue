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
            <div class="main-layout user-body">
              <a-popover trigger="click">
                <div role="button" class="main-layout flex-row user-inner">
                  <div class="main-layout avatar">
                    <img :src="user.avatar" class="avatar-image" style="width: 42px;height: 42px;"
                         :alt="user.nick_name">
                  </div>
                  <div class="main-layout gu-flex-shrink user-container">
                    <div class="main-layout nickname">
                      {{user.nick_name}}
                    </div>
                    <div class="main-layout username">
                      @{{user.user_name}}
                    </div>
                  </div>
                  <div class="main-layout flex-grow1 align-items-end">
                    <svg-icon iconClass="down" class="" style="font-size:22px"></svg-icon>
                  </div>
                </div>
                <template slot="content">
                  <div class="main-layout">
                    <div class="main-layout user-body">
                      <div class="main-layout avatar">
                        <img :src="user.avatar" class="avatar-image" style="width: 42px;height: 42px;"
                             :alt="user.nick_name">
                      </div>
                      <div class="main-layout gu-flex-shrink user-container">
                        <div class="main-layout nickname">
                          {{user.nick_name}}
                        </div>
                        <div class="main-layout username">
                          @{{user.user_name}}
                        </div>
                      </div>
                    </div>
                    <div class="main-layout">
                      <a href="javascript:;" @click="handleLogout">
                        退出 @{{user.user_name}}
                      </a>
                    </div>
                  </div>
                </template>
              </a-popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

  import {mapActions, mapGetters} from "vuex";

  export default {
    data() {
      return {
        userUrl: '',
        user: {
          user_name: '',
          nick_name: '',
          avatar: ''
        }
      };
    },
    created() {
      this.render()
    },
    methods: {
      ...mapGetters(['userInfo']),
      ...mapActions(['Logout']),
      render() {
        this.user.user_name = this.userInfo().user_name
        this.user.nick_name = this.userInfo().nick_name
        this.user.avatar = this.userInfo().avatar
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
  };
</script>

<style lang="less" scoped>
  /*@import url('../components/global.less');*/

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

  .user-body {
    margin-top: 20px;
    margin-bottom: 10px;
    width: 94%;
  }

  .user-inner {
    padding: 10px;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 99px;
    background-color: #fff;
  }

  .user-container {
    margin-left: 12px;

    .nickname {
      font-weight: 600;
    }
    .username{
      color:@font-light-color;
      font-weight: 500;
    }
  }
</style>
