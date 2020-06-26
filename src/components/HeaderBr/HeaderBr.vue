<template>
  <div class="main-layout">
    <div class="main-layout b-header">
      <div class="main-layout flex-row">
        <div class="main-layout align-items-start flex-grow1">
          <h2 class="">
            <span class="">主页</span>
          </h2>
        </div>
        <div class="main-layout align-items-end">
          <svg-icon iconClass="user" class="" style="font-size:22px"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'headerBr',
  }
</script>
<style lang="less" scoped>
  @import url('../../components/global.less');

  .b-header {
    height: 53px;
    padding-left: 15px;
    padding-right: 15px;
  }
</style>