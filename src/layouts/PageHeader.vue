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
