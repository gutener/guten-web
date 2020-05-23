<template>
  <div class="Feed">
    <div class="ContentItem ArticleItem">
      <h2 class="ContentItem-title">
        <a :href="url" target="_blank">{{title}}</a>
      </h2>
      <div :class="[readMoreActivated ? 'RichContent' : 'RichContent is-collapsed']">
        <div class="RichContent-inner">
            <div v-if="!readMoreActivated" class="RichText" v-html="excerpt"></div>
            <div v-if="readMoreActivated" class="RichText" v-html="body"></div>
          <a @click="readMoreActivate" class="Button ContentItem-more Button--plain">阅读全文</a>
        </div>
<!--        <div class="ContentItem-actions">-->
<!--          <button type="button"-->
<!--                  class="Button ContentItem-action Button&#45;&#45;plain Button&#45;&#45;withIcon Button&#45;&#45;withLabel">-->
<!--                    <span style="display: inline-flex; align-items: center;">-->
<!--                      <svg-icon iconClass="reply" style="font-size: 20px;"></svg-icon>-->
<!--                    </span>-->
<!--            <span>305 条回复</span>-->
<!--          </button>-->
<!--          <button type="button" class="Button ContentItem-action Button&#45;&#45;plain Button&#45;&#45;withIcon Button&#45;&#45;withLabel">-->
<!--            <span style="display: inline-flex; align-items: center;"></span><span>收藏</span>-->
<!--          </button>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:"hp-card",
    props: [
      'url',
      'title',
      'body',
      'excerpt',
    ],
    data() {
      return {
        readMoreActivated:false
      }
    },
    methods: {
      readMoreActivate(){
        this.readMoreActivated = !this.readMoreActivated

      }
    }
  }
</script>
<style lang="less" scoped>
  @import url('storycard.less');
</style>