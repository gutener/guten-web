<template>
  <div class="ContentItem">
    <h2 class="ContentItem-title">
      <a :href="source.url" target="_blank">{{source.target.title}}</a>
    </h2>
    <div v-show="!!source.target.tags" style="margin-bottom: 18px;margin-top: -6px;">
      <a :href="tag.url" target="_blank" class="tag-node" v-for="tag in tags">
        {{tag.name}}
      </a>
    </div>
    <div class="RichContent">
      <div class="RichContent-inner">
        <div class="RichText" v-html="source.target.excerpt"></div>
      </div>
      <div class="RichContent-flex u-flex">
        <div class="u-flexCenter u-flex1">
          <div v-if="source.haveSeed" class="ui-captionUser">
            <div class="postMetaInline">
              <!--TODO 没有销毁popover内容-->
              <a-popover trigger="hover" :destroyTooltipOnHide=true>
                <a :href="source.author.url">{{source.author.nick_name}}</a>
                <UserPopover :user="source.author" slot="content"/>
              </a-popover>
            </div>
          </div>
          <div class="ui-caption">
            <time class="u-inlineBlock u-lineHeightBase">{{source.target.create_time}}</time>
            <span class="middotDivider"></span>
            <span class="readingTime" :title="source.target.seed_count"></span>
            <span class="middotDivider"></span>
            <span>
              <span style="margin-right: 2px">{{source.target.reply_count}}</span>
              <svg-icon iconClass="comment-o"></svg-icon>
            </span>
          </div>
        </div>
        <button class="RichContent-button">
          <div style="font-weight: bold;color: #898a89;">{{source.target.reward}}<i>₲</i></div>
        </button>
        <button class="RichContent-button" style="cursor: pointer;">
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
  import UserPopover from "@/views/user/UserPopover";
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
      UserPopover
    },
    data() {
      return {
        tags:[]
      }
    },
    created() {
      this.init()
    },
    methods: {
      init(){
        console.log(this.source)
        if(!!this.source.target.tags){
          this.source.target.tags.split(';').forEach(tag=>{
            const tagObj={
              url:`/hashtag/${tag.replace('#','')}?src=homepage_click`,
              name:tag
            }
            this.tags.push(tagObj)
          })
        }
      }
    },

  }
</script>
<style lang="less" scoped>
  @import url('storycard.less');
  .user-popover{
    .avatar-image{
      width: 62px;
      height: 62px;
    }
  }
</style>