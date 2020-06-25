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
                <a class="flex-grow1 header-menu-option align-items-start" href="/">
                  <div class="menu-option-body">
                    <svg-icon iconClass="bank" class="" style="font-size:20px"></svg-icon>
                    <div class="menu-option-title"><span>主页</span></div>
                  </div>
                </a>
                <a class="flex-grow1 header-menu-option align-items-start" href="/channels">
                  <div class="menu-option-body">
                    <svg-icon iconClass="channel" class="" style="font-size:20px"></svg-icon>
                    <div class="menu-option-title"><span>频道</span></div>
                  </div>
                </a>
                <a class="flex-grow1 header-menu-option align-items-start" href="/channels">
                  <div class="menu-option-body">
                    <svg-icon iconClass="notification" class="" style="font-size:20px"></svg-icon>
                    <div class="menu-option-title"><span>消息</span></div>
                  </div>
                </a>
              </nav>
            </div>
            <div class="main-layout">
              <div class="">
              <span class="PostStory" id="HeaderUserActions--NewPost">
                <a class="CreatePost" aria-label="Create Post" href="/new-story">
                  发文
                </a>
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

  export default {
    data() {
      return {
        hiddenBtn: false,
        selectData: [],
        navlist: [],
        selectValue: "",
        placeholder: "",
        headerHeight: 52,
        scrollHeight: 0,
        isActive: true
      };
    },
    created() {
    },
  };
</script>

<style lang="less" scoped>
  @import url('../components/global.less');
</style>
