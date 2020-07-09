<template>
  <div class="main-layout padding-default paddingTop10 paddingBottom10 seed-card">
    <div class="main-layout flex-row">
      <div>{{source.seed_user_name}}</div>
      <div>{{source.seed_amount}}</div>
    </div>
    <div>{{source.seed_item_body}}</div>
  </div>
</template>
<script>
  export default {
    name: "seed-card",
    props: {
      source: {
        type: Object,
        default() {
          return {}
        }
      }
    },
  }
</script>
<style lang="less" scoped>
  .seed-card {
    border-bottom: 1px solid rgb(230, 236, 240) !important;

    &:hover {
      background-color: rgb(245, 248, 250);
    }
  }
</style>