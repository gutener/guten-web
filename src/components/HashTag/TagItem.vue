<template>
  <div role="button" class="main-layout">
    <div class="main-layout tag-stream">
      <div class="main-layout">
        <div class="main-layout tag-stream-header">
          <router-link :to="source.url">{{source.tag_name}}</router-link>
        </div>
        <div class="main-layout flex-row justify-between tag-stream-footer">
          <div class="main-layout">{{source.item_count}} 内容</div>
          <div class="main-layout">{{source.follower_count}} 关注人</div>
        </div>
      </div>
      <div class="main-layout">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      source: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    created() {
      this.render()
    },
    methods: {
      render(){
        this.source.url = `/hashtag/${this.source.tag_name.replace('#','')}?src=trend_click`
      }
    }
  }
</script>
<style lang="less" scoped>
  .tag-stream{
    border-bottom: 1px solid @border-color;
    padding:@default-min-spacing;
  }
  .tag-stream-header{
    font-size:14px
  }
  .tag-stream-footer{
    font-size: 14px;
  }
</style>