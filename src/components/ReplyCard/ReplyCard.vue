<template>
  <article class="main-layout flex-row ReplyCard">
    <div class="main-layout align-items-center flex-grow0 ReplyCard-aside">
      <button class="GuButton GuButton--seed">
        <span class="seed">{{source.reward}}<span class="main-layout" style="margin-top: -6px;"><i>₲</i></span></span>
      </button>
    </div>
    <div class="StoryCard-body">
      <div class="main-layout">
        <div class="main-layout">
          <div class="main-layout" v-html="source.excerpt"></div>
        </div>
      </div>
      <div class="reply-story-container">
        <h2 class="ContentItem-title">
          <a :href="source.url" target="_blank">{{source.title}}</a>
        </h2>
        <div class="RichContent">
          <div class="RichContent-inner">
            <div class="RichText" v-html="source.story_excerpt"></div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
  export default {
    name: "reply-card",
    props: {
      source: {
        type: Object,
        default() {
          return {
          }
        }
      }
    },
    created() {
      this.render()
    },
    methods:{
      render(){
        this.source.url = `/story/${this.source.story_id}`
      }
    }
  }
</script>
<style lang="less" scoped>
  .ReplyCard {
    border-bottom: 1px solid rgb(230, 236, 240) !important;
    padding-left: @default-15-spacing !important;
    padding-right: @default-15-spacing !important;
    padding-top: @default-15-spacing !important;
    padding-bottom: @default-15-spacing !important;
    &:hover {
      background-color: rgb(245, 248, 250);
    }
  }
  .ReplyCard-body {
    padding-bottom: @default-min-spacing;
    width: 100%;
  }
  .ReplyCard-aside {
    margin-right: @default-min-spacing;
  }
  .reply-story-container {
    border-radius: 14px;
    border: 1px solid rgba(204, 214, 221, 0.55);
    background-color: rgba(204, 214, 221, 0.15);
    min-height: 59px;
    transition-duration: 0.2s;
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 10px;
  }
</style>