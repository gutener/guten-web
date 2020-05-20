<template>
  <div>
    <zh-header />
    <main class="guten-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import zhHeader from "./PageHeader";
export default {
  data() {
    return {};
  },
  components: {
    "zh-header": zhHeader,
  }
};
</script>

<style lang="less" scoped>
@import url('../components/global.less');

</style>
