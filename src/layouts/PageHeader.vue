<template>
  <header
          class="Sticky "
          :class="[isActive ? 'AppHeader' : 'AppHeader isFiexd']"
  >
    <div class="AppHeader-inner">
      <a href="//www.gutener.com" aria-label="Guten">
        <svg-icon iconClass="gutenberg" style="font-size: 42px;"></svg-icon>
      </a>
      <div class="Tabs AppHeader-tooltips">
        <span class="Tabs-item PostStory" id="HeaderUserActions--NewPost">
          <a class="CreatePost" aria-label="Create Post" href="/story/post">
            <a-icon class="CreatePost-icon" type="plus-square"/>
          </a>
        </span>
      </div>
      <ul role="navigation" class="Tabs AppHeader-Tabs">
        <li role="tab" class="Tabs-item AppHeader-Tab Tabs-item--noMeta"><a
                class="Tabs-link AppHeader-TabsLink is-active" href="//www.zhihu.com/"
                data-za-not-track-link="true">首页</a>
        </li>
        <li role="tab" class="Tabs-item AppHeader-Tab Tabs-item--noMeta">
          <a class="Tabs-link AppHeader-TabsLink"
             href="//www.zhihu.com/explore" data-za-not-track-link="true">发现</a>
        </li>
      </ul>
      <div class="AppHeader-menu">
        <header-menu/>
      </div>
    </div>
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
        if (document.documentElement.scrollTop >= 52) {
          this.isActive = false;
        } else {
          this.isActive = true;
        }
      }
    },
    components: {
      HeaderMenu
    }
  };
</script>

<style lang="less">
  .AppHeader {
    position: relative;
    z-index: 100;
    overflow: hidden;
    background: #fff;
    background-clip: content-box
  }

  html[data-theme=dark] .AppHeader {
    background: #1a1a1a;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3)
  }

  .AppHeader.is-fixed {
    z-index: 100
  }

  .AppHeader-inner {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 82px;
    padding: 0 16px;
    margin: 0 auto;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s
  }

  .AppHeader.is-hidden .AppHeader-inner {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%)
  }

  .Tabs {
    margin-left: 82px;
  }

  html[data-theme=dark] .Tabs {
    border-bottom: 1px solid #2e2e2e
  }

  .Tabs-item {
    display: inline-block;
    padding: 0 20px
  }

  .Tabs-link {
    position: relative;
    display: inline-block;
    padding: 14px 0;
    font-size: 16px;
    line-height: 22px;
    color: #1a1a1a;
    text-align: center
  }

  .AppHeader-Tabs {
    border-bottom: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 0 23px;
    margin-left: 82px;
  }

  .AppHeader-Tab {
    padding: 0 17px
  }

  .AppHeader-TabsLink {
    color: #8590a6;
    font-size: 15px
  }

  html[data-theme=dark] .AppHeader-TabsLink {
    color: #606a80
  }

  .AppHeader-TabsLink.is-active {
    color: #444
  }

  html[data-theme=dark] .AppHeader-TabsLink.is-active {
    color: grey
  }

  .AppHeader-TabsLink:hover {
    color: #444
  }

  html[data-theme=dark] .AppHeader-TabsLink:hover {
    color: grey
  }

  button {
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: initial;
  }

  .AppHeader-tooltips {
    .PostStory {
      margin-left: 8px;

      .CreatePost {
        -ms-flex-align: center;
        align-items: center;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: row;
        flex-direction: row;
        position: relative;
        border: 0;

        .CreatePost-icon {
          border-radius: 2px;
          -ms-flex-align: center;
          align-items: center;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-direction: row;
          flex-direction: row;
          padding: 8px;
          position: relative;
          font-size: 30px;
        }
      }

    }
  }
</style>
