<template>
  <div>
    <zh-header />
    <main class="guten-main">
      <div class="Hotstory">
        <div class="Hotstory-container">
          <!-- Main content -->
          <router-view></router-view>
          <zh-asider/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import zhHeader from "./PageHeader";
import zhAsider from "./Asider";
export default {
  data() {
    return {};
  },
  components: {
    "zh-header": zhHeader,
    "zh-asider": zhAsider
  }
};
</script>

<style lang="less" scoped>
@import url('../components/global.less');
.Hotstory-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  width: 1000px;
  padding: 0 16px;
  margin: 10px auto
}
</style>
