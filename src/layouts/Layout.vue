<template>
  <div class="main-layout main-css">
    <div class="main-layout flex-row">
      <guten-header/>
      <main class="main-layout align-items-start flex-grow1 gu-main-width">
        <div class="main-layout flex-row ">
          <div class="main-layout align-items-end flex-grow1 gu-main-col-width main-border">
            <router-view :key="$route.fullPath"></router-view>
          </div>
          <Aside/>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import PageHeader from "./PageHeader"
  import Aside from '@/components/Aside/Aside'
  export default {
    data() {
      return {};
    },
    components: {
      "guten-header": PageHeader,
      Aside
    }
  }
</script>

<style lang="less" scoped>
  @import url('./layouts');
</style>
