<template>
  <article class="main-layout flex-row padding-default paddingTop10 paddingBottom10">
    <div class="main-layout align-items-center flex-grow0 StoryCard-aside">
      <button class="GuButton GuButton--seed">
        <span class="seed">{{source.reward}}<span class="main-layout" style="margin-top: -6px;"><i>₲</i></span></span>
      </button>
    </div>
    <div class="StoryCard-body">
      <div v-if="!!source.seed_user" class="main-layout flex-row">
        <div class="main-layout StoryCard-bar">
          <svg-icon iconClass="seed" style="margin-right: 6px;margin-top: 2px;"></svg-icon>
        </div>
        <div v-for="seedUser in source.seed_user" class="main-layout avatar">
          <img :src="seedUser.avatar" :alt="seedUser.nick_name" class="avatar-image" style="width: 20px; height: 20px;">
        </div>
      </div>
      <div class="main-layout StoryCard-title">
        <h2 class="main-layout">
          <a :href="story.url" target="_blank">{{story.title}}</a>
        </h2>
        <div class="main-layout flex-row StoryCard-bar">
          <div v-if="!!source.creator" role="button">
            <a-popover>
              <span style="color:rgba(0,0,0,0.85);font-weight:800;margin-right:4px">{{source.creator.nick_name}}</span>
              <span>@{{source.creator.user_name}}</span>
              <UserPopover :user="source.creator" slot="content"/>
            </a-popover>
            <svg-icon iconClass="dot-light"></svg-icon>
          </div>
          <div class="main-layout">
            <span>{{story.create_time}}</span>
          </div>
        </div>
      </div>
      <div class="main-layout">
        <div class="main-layout">
          <div class="main-layout" v-html="story.excerpt"></div>
        </div>
        <div v-if="!!story.cover" class="main-layout StoryCard-cover">
          <a class="backgroundCover" :style="cover"></a>
        </div>
      </div>
      <div class="main-layout flex-row justify-between marginTop10">
        <div class="flex-row">
          <svg-icon iconClass="comment"></svg-icon>
          <span class="min-marginLeft">{{story.reply_count}}</span>
        </div>
        <div v-if="!!source.seed_count" class="flex-row">
          <svg-icon iconClass="seed-o" style="font-size: 16px"></svg-icon>
          <span class="min-marginLeft">{{source.seed_count}}</span>
        </div>
        <div role="button" class="flex-row" @click="showModal">
          <svg-icon iconClass="retweet" style="font-size: 18px;"></svg-icon>
        </div>
        <div v-if="activeBookmark" role="button" class="flex-row">
          <div @click="bookmark">
            <svg-icon iconClass="bookmark" style="font-size: 18px;"></svg-icon>
          </div>
        </div>
        <div role="button" class="flex-row">
          <svg-icon iconClass="dislike" style="font-size: 19px;"></svg-icon>
        </div>
      </div>
    </div>
    <a-modal v-model="visible">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </article>
</template>
<script>
  import moment from 'moment'
  import UserPopover from '@/components/UserPopover'
  import {addBookmark} from '@/api/biz'
  import RetweetModal from './RetweetModal'

  export default {
    name: "story-card",
    props: {
      source: {
        type: Object,
        default() {
          return {
            cover: ''
          }
        }
      },
      activeBookmark: {
        type: Boolean,
        default: false
      }
    },
    components: {
      UserPopover,
      RetweetModal
    },
    created() {
      this.render()
    },
    data() {
      return {
        visible: false,
        story:{}
      }
    },
    methods: {
      moment: function (date) {
        return moment(date)
      },
      render() {
        this.story = this.source.target
        const currentTime = moment()
        let creatTime = moment(this.story.create_time)
        if (currentTime.diff(creatTime, 'days') > 7) {
          if (currentTime.format('YYYY') === creatTime.format('YYYY')) {
            this.story.create_time = creatTime.format("MMMDo")
          } else {
            this.story.create_time = creatTime.format("LL")
          }
        } else {
          this.story.create_time = creatTime.fromNow()
        }
        this.story.url = `/story/${this.source.id}`
        if (!!this.story.cover) {
          this.cover = `background-image: url("${this.story.cover}"); background-position: 50% 50%;`
        }
      },
      showModal() {
        this.visible = true;
      },
      bookmark() {
        const param = {
          story_id: this.story.id
        }
        addBookmark(param)
            .then(response => {

            })
            .catch(error => {
              console.error(error)
            })
      }
    }
  }
</script>
<style lang="less" scoped>
  .StoryCard {
    border-bottom: 1px solid rgb(230, 236, 240) !important;
    &:hover {
      background-color: rgb(245, 248, 250);
    }
  }

  .StoryCard-bar {
    color: @font-light-color;
    line-height: 1.5;
    font-size: 14px;
    font-weight: 600;
  }

  .StoryCard-aside {
    margin-right: @default-min-spacing;
  }

  .StoryCard-body {
    padding-bottom: @default-min-spacing;
    width: 100%;
  }

  .StoryCard-title {
    line-height: 1.6;
    color: #1a1a1a;
    margin-bottom: @default-min-spacing;

    a {
      color: rgba(0, 0, 0, .84);
      fill: rgba(0, 0, 0, .84);
      font-weight: 800;
      font-size: 1.1rem;
    }
  }

  .StoryCard-cover {
    width: 100%;
    height: 352px;

    .backgroundCover {
      background-position: center;
      background-origin: border-box;
      background-size: cover;
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 12px;
    }
  }

</style>