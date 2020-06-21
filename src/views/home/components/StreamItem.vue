<template>
  <div class="ContentItem">
    <article style="margin-right:16px;width: 100%;">
      <h2 class="ContentItem-title">
        <a :href="source.url" target="_blank">{{source.target.title}}</a>
      </h2>
      <div v-if="!!source.target.tags" style="margin-bottom: 18px;margin-top: -6px;">
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
            <div v-if="source.have_seeded" class="ui-captionUser">
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
              <span v-if="source.target.seed_count">
              <span class="middotDivider"></span>
              <span class="readingTime" :title="source.target.seed_count"></span>
            </span>
              <span class="middotDivider"></span>
              <span>
              <span style="margin-right: 2px">{{source.target.reply_count}}</span>
              <svg-icon iconClass="comment-o"></svg-icon>
            </span>
            </div>
          </div>
          <button class="RichContent-button">
            <span style="font-weight: bold;color: #898a89;">{{source.target.reward}}<i>₲</i></span>
          </button>
          <button @click="addBookmark" class="RichContent-button">
            <svg-icon iconClass="bookmark" style="font-size: 18px;"></svg-icon>
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
    </article>
    <div v-if="!!source.target.cover" class="ContentItem-cover">
      <a class="backgroundCover" :style="cover"></a>
    </div>
  </div>
</template>
<script>
  import UserPopover from "@/views/user/UserPopover"
  import {addBookmark} from '@/api/biz'
  import moment from "moment";

  export default {
    name: "hp-card",
    props: {
      source: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      UserPopover
    },
    data() {
      return {
        tags: [],
        cover: ''
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
        this.source.url = `/stories/${this.source.target.item_id}`
        this.source.target.seed_count =
            !!this.source.target.seed_count ? `${this.source.target.seed_count} SEEDED` : ''

        const currentTime = moment()
        let createTime = moment(this.source.target.create_time)
        if (currentTime.diff(createTime, 'days') > 7) {
          this.source.target.create_time = createTime.format('LL')
        } else {
          this.source.target.create_time = createTime.fromNow()
        }
        if (this.source.target.have_seeded) {
          this.source.haveSeed = true
          this.source.author.url = `/u/${this.source.author.user_name}`
        }
        if (!!this.source.target.tags) {
          this.source.target.tags.split(';').forEach(tag => {
            const tagObj = {
              url: `/hashtag/${tag.replace('#', '')}?src=homepage_click`,
              name: tag
            }
            this.tags.push(tagObj)
          })
        }
        if (!!this.source.target.cover) {
          this.cover = `background-image: url("${this.source.target.cover}"); background-position: 50% 50%;`
        }
      },
      addBookmark() {
        const param = {
          story_id: this.source.target.item_id
        }
        addBookmark(param)
            .then(response => {

            })
            .catch(error => {
              console.error(error)
            })
      }
    },

  }
</script>
<style lang="less" scoped>
  @import url('StreamItem.less');

  .user-popover {
    .avatar-image {
      width: 62px;
      height: 62px;
    }
  }
</style>