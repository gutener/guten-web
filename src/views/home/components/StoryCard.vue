<template>
  <div class="ContentItem">
    <h2 class="ContentItem-title">
      <a :href="source.url" target="_blank">{{source.target.title}}</a>
    </h2>
    <div :class="[readMoreActivated ? 'RichContent' : 'RichContent is-collapsed']">
      <div class="RichContent-inner">
        <div v-if="!readMoreActivated" class="RichText" v-html="source.excerpt"></div>
        <div v-if="readMoreActivated" class="RichText" v-html="source.target.body"></div>
        <a @click="readMoreActivate" class="Button ContentItem-more Button--plain">阅读全文</a>
      </div>
      <div class="RichContent-bar">
        <div class="ui-caption">
          <time class="u-inlineBlock u-lineHeightBase">{{moment(source.target.create_time).fromNow()}}</time>
        </div>
        <button></button>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    name:"hp-card",
    props: {
      source: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        readMoreActivated:false
      }
    },
    methods: {
      moment: function (date) {
        return moment(date)
      },
      readMoreActivate(){
        this.readMoreActivated = !this.readMoreActivated

      }
    }
  }
</script>
<style lang="less" scoped>
  @import url('storycard.less');
</style>