<template>
  <div>
    <zh-header />
    <el-container class="zh-main">
      <div style="padding-top:20px;width:100%;">
        <!-- Main content -->
        <router-view></router-view>
      </div>
      <zh-asider />
    </el-container>
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

<style>
.zh-main {
  width: 1000px;
  margin: 0 auto;
  padding-bottom: 20px;
}
</style>
