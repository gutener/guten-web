<template>
  <div class="Fund-container">
    <Fund/>
    <div class="Fund-mainColumn flex">
      <div class="Fund-grow">
        <h2 style="color: rgb(170, 170, 170);">Seeders</h2>
        <SeedersList/>
      </div>
      <div class="Fund-grow">
        <h2 style="color: rgb(170, 170, 170);">Seeded</h2>
      </div>
    </div>
  </div>
</template>
<script>
  import Fund from './Fund'
  import SeedersList from './SeedersList'
  export default {
    components: {
      Fund,
      SeedersList
    }
  }
</script>
<style lang="less" scoped>
  @import "Fund.less";
</style>