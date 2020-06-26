<template>
  <div class="main-layout main-css">
    <div class="main-layout flex-row">
      <guten-header/>
      <main class="main-layout align-items-start flex-grow1">
        <div class="main-layout gu-main-width">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import PageHeader from "./PageHeader"
  export default {
    data() {
      return {};
    },
    components: {
      "guten-header": PageHeader,
    }
  };
</script>

<style lang="less" scoped>
  @import url('../components/global.less');
</style>
