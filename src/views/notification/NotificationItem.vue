<template>
  <div v-if="source.action ==='seed'" class="main-layout notification">
    <SeedItem :data="source"/>
  </div>
  <div v-else-if="source.action ==='follow'" class="main-layout notification">
    <FollowItem :data="source"/>
  </div>
</template>
<script>
  import SeedItem from "./item/SeedItem"
  import FollowItem from "./item/FollowItem"
  export default {
    name:"notification-card",
    props: {
      source: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    components: {
      SeedItem,
      FollowItem
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        console.log(this.source.action)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import url('../../components/global.less');

  .notification {
    padding: 12px;
    border-bottom: 1px solid @border-color;
    background-color: #fff;
    border-radius: 0px;
  }
</style>