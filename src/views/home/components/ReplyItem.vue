<template>
  <article style="margin: 12px 6px 12px 6px;width: 100%;">
    <div class="RichContent">
      <div class="RichContent-inner">
        <div class="RichText" v-html="source.target.excerpt"></div>
      </div>
    </div>
    <div class="reply-story-container">
      <h2 class="ContentItem-title">
        <a :href="source.url" target="_blank">{{source.target.title}}</a>
      </h2>
      <div class="RichContent">
        <div class="RichContent-inner">
          <div class="RichText" v-html="source.target.story_excerpt"></div>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
  import moment from "moment";

  export default {
    name: "story-card",
    props: {
      source: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    created() {
      this.init()
    },
    methods: {
      moment: function (date) {
        return moment(date)
      },
      init() {
        this.source.url = `/story/${this.source.target.story_id}`
      }
    }
  }
</script>
<style lang="less" scoped>
  @import url('ReplyItem.less');
  .user-popover {
    .avatar-image {
      width: 62px;
      height: 62px;
    }
  }
</style>