<template>
  <div class="ContentItem">
    <h2 class="ContentItem-title">
      <a :href="source.url" target="_blank">{{source.target.title}}</a>
    </h2>
    <div class="RichContent">
      <div class="RichContent-inner">
        <div class="RichText" v-html="source.excerpt"></div>
      </div>
      <div class="RichContent-flex u-flex">
        <div class="u-flexCenter u-flex1">
          <div class="ui-captionUser">
            <div class="postMetaInline">
              <a>wyp</a>
            </div>
          </div>
          <div class="ui-caption">
            <time class="u-inlineBlock u-lineHeightBase">{{moment(source.target.create_time).fromNow()}}</time>
          </div>
        </div>
        <button class="RichContent-button">
          <div style="font-weight: bold;color: #898a89;">{{source.target.seed}}<i>₲</i></div>
        </button>
        <button class="RichContent-button">
          <svg-icon iconClass="more" style="font-size:26px"></svg-icon>
        </button>
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
      }
    },
    methods: {
      moment: function (date) {
        return moment(date)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import url('storycard.less');
</style>