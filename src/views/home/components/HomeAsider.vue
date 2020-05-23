<template>
  <aside class="GlobalSideBar">
    <div class="Card TodayTopUser">
      <h2 class="title"><a href="/subreddits/leaderboard/">Today's Top Growing Communities</a></h2>
    </div>
  </aside>
</template>

<script>
  export default {
    data() {
      return {
        projectData: [
          {
            name: "VE-Admin",
            intro: "舞蹈培训班后台项目",
            inn: "Node.js/vue.js/小程序/elementUI",
            url: "https://github.com/ragnar-document/VE-Admin"
          },
          {
            name: "Koa-Admin",
            intro: "后台增删改项目",
            inn: "node.js/koa/vue.js/ElementUI",
            url: "https://github.com/ragnar-document/OKR-KOA"
          },
          {
            name: "OKR小程序",
            intro: "类似于todolist的小程序",
            inn: "node.js/koa/小程序",
            url: "https://github.com/ragnar-document/OKR-KOA"
          },
          {
            name: "V2EX小程序",
            intro: "一个某课卖99的简单小程序",
            inn: "小程序",
            url: "https://github.com/ragnar-document/Wechat-V2EX"
          }
        ]
      };
    },
    components: {}
  };
</script>

<style lang="less">
  .GlobalSideBar {
    -webkit-box-flex: 1;
    -ms-flex: 1 1;
    flex: 1 1;
    font-size: 14px;

    .Card {
      margin-bottom: 10px;
      background: #fff;
      overflow: hidden;
      border-radius: 2px;
      -webkit-box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
      box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    .TodayTopUser {
      background-color: #0079d3;
      background-position: 50%;
      background-repeat: no-repeat;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      height: 80px;
      position: relative;

      .title {
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        bottom: 8px;
        color: #fff;
        left: 16px;
        position: absolute;
      }
    }
  }
  .mobile .GlobalSideBar{
    display: none;
  }
</style>
