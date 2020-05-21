<template>
  <div>
    <guten-header />
    <main class="guten-main">
      <router-view></router-view>
    </main>
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
