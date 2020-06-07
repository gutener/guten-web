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
          <div v-if="source.haveSeed" class="ui-captionUser">
            <div class="postMetaInline">
              <a-popover trigger="hover">
                <a :href="source.author.url">{{source.author.user_name}}</a>
                <template slot="content">
                  {{source.author.user_name}}
                </template>
              </a-popover>
            </div>
          </div>
          <div class="ui-caption">
            <time class="u-inlineBlock u-lineHeightBase">{{source.target.create_time}}</time>
            <span class="middotDivider"></span>
            <span class="readingTime" :title="source.target.seed_count"></span>
          </div>
        </div>
        <button class="RichContent-button">
          <div style="font-weight: bold;color: #898a89;">{{source.target.seed}}<i>₲</i></div>
        </button>
        <button class="RichContent-button">
          <a-popover trigger="click">
            <template slot="content">
              <ul class="tooltip-content">
                <li class="">
                  <button class="u-normalWrap">Dismiss this story</button>
                </li>
                <li class="">
                  <button class="u-normalWrap">Mute this author</button>
                </li>
                <li class="">
                  <button class="u-normalWrap">Mute this publication</button>
                </li>
              </ul>
            </template>
            <svg-icon iconClass="more" style="font-size:26px"></svg-icon>
          </a-popover>
        </button>
      </div>
    </div>

  </div>
</template>
<script>

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
    components: {
    },
    data() {
      return {
      }
    },
    methods: {

    }
  }
</script>
<style lang="less" scoped>
  @import url('storycard.less');
</style>