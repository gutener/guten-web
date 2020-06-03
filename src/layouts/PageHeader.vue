<template>
  <header :class="[isActive ? 'AppHeader' : 'AppHeader AppHeader--fixed']">
    <nav class="AppHeader-inner">
      <div class="AppHeader-brand-image">
        <a href="/" aria-label="Guten">
          <svg-icon iconClass="g-logo" style="font-size: 38px;"></svg-icon>
        </a>
      </div>
      <div class="AppHeader-menu-options AppHeader-menu-options--left">
        <div class="AppHeader-menu-option">
          <a class="CreatePost" aria-label="Create Post" href="/fund">
            <svg-icon iconClass="bank" style="font-size:30px"></svg-icon>
          </a>
        </div>
        <div class="AppHeader-menu-option">
          <span class="PostStory" id="HeaderUserActions--NewPost">
            <a class="CreatePost" aria-label="Create Post" href="/new-story">
              <svg-icon iconClass="edit" style="font-size:30px"></svg-icon>
            </a>
          </span>
        </div>
        <div class="AppHeader-menu-option">
          <!--<a class="" href="//www.zhihu.com/" data-za-not-track-link="true">首页</a>-->
        </div>
      </div>
      <div class="AppHeader-menu-options AppHeader-menu-options--right">
        <header-menu/>
      </div>
    </nav>
  </header>
</template>

<script>
  import HeaderMenu from './HeaderMenu'

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
    mounted() {
      window.addEventListener("scroll", this.getScroll);
    },
    methods: {
      //监听滚动
      getScroll() {
        this.isActive = document.documentElement.scrollTop < 52;
      }
    },
    components: {
      HeaderMenu
    }
  };
</script>

<style lang="less">
  @import url('header.less');

</style>
