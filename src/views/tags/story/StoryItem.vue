<template>
  <article style="margin: 12px 6px 12px 6px;width: 100%;">
    <div v-if="!!source.seeded_user" class="ui-caption" style="margin-bottom: 6px;">
      <svg-icon iconClass="seed" style="margin-right:4px" ></svg-icon>
      <span style="font-weight:bold">{{source.seeded_user[0].nick_name}}</span> seed过
    </div>
    <h2 class="ContentItem-title">
      <a :href="source.url" target="_blank">{{source.title}}</a>
    </h2>
    <div v-if="!!source.tags" style="margin-bottom: 18px;margin-top: -6px;">
      <router-link :to="tag.url" class="tag-node" v-for="tag in tags">
        {{tag.name}}
      </router-link>
    </div>
    <div class="RichContent">
      <div class="RichContent-inner">
        <div class="RichText" v-html="source.excerpt"></div>
      </div>
    </div>
  </article>
</template>
<script>
  import UserPopover from "@/views/user/UserPopover"
  import SeedButton from "@/components/Button/SeedButton";
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
    components: {
      UserPopover,
      SeedButton
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
        this.source.url = `/story/${this.source.id}`
        this.source.seed_count =
            !!this.source.seed_count ? `${this.source.seed_count} SEEDED` : ''

        const currentTime = moment()
        let createTime = moment(this.source.create_time)
        if (currentTime.diff(createTime, 'days') > 7) {
          this.source.create_time = createTime.format('LL')
        } else {
          this.source.create_time = createTime.fromNow()
        }
        if (this.source.have_seeded) {
          this.source.author.url = `/u/${this.source.author.user_name}`
        }
        if (!!this.source.tags) {
          this.source.tags.split(';').forEach(tag => {
            const tagObj = {
              url: `/hashtag/${tag.replace('#', '')}?src=hashtag_click`,
              name: tag
            }
            this.tags.push(tagObj)
          })
        }
        if (!!this.source.cover) {
          this.cover = `background-image: url("${this.source.cover}"); background-position: 50% 50%;`
        }
      }
    },
  }
</script>
<style lang="less" scoped>
  @import url('StoryItem.less');
  .user-popover {
    .avatar-image {
      width: 62px;
      height: 62px;
    }
  }
</style>