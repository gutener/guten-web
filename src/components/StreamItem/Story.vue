<template>
  <article class="main-layout flex-row StreamItem">
    <div class="main-layout align-items-center flex-grow0 StreamItem-aside">
      <button class="GuButton GuButton--seed">
        <span class="seed">{{source.reward}}<span class="main-layout" style="margin-top: -6px;"><i>₲</i></span></span>
      </button>
    </div>
    <div class="StreamItem-body">
      <div class="main-layout StreamItem-title">
        <h2 class="main-layout">
          <a :href="source.url" target="_blank">{{source.title}}</a>
        </h2>
      </div>
      <div class="main-layout">
        <div class="main-layout">
          <div class="main-layout" v-html="source.excerpt"></div>
        </div>
        <div v-if="!!source.cover" class="main-layout StreamItem-cover">
          <a class="backgroundCover" :style="cover"></a>
        </div>
      </div>
      <div class="main-layout flex-row justify-between StreamItem-header">
        <div class="flex-row">
          <span>{{source.create_time}}</span>
        </div>
        <div class="flex-row">
          <svg-icon iconClass="comment-o"></svg-icon>
          <span class="min-marginLeft">{{source.reply_count}}</span>
        </div>
        <div v-if="!!source.seed_count" class="flex-row">
          <svg-icon iconClass="seed-o" style="font-size: 16px"></svg-icon>
          <span class="min-marginLeft">{{source.seed_count}}</span>
        </div>
        <div class="flex-row">
          <svg-icon iconClass="more"></svg-icon>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
  import moment from 'moment'

  export default {
    name: "bookmark-card",
    props: {
      source: {
        type: Object,
        default() {
          return {
            cover: ''
          }
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
        const currentTime = moment()
        let seedTime = moment(this.source.create_time)
        if (currentTime.diff(seedTime, 'days') > 7) {
          this.source.create_time = seedTime.format('LL')
        } else {
          this.source.create_time = seedTime.fromNow()
        }
        if (!!this.source.cover) {
          this.cover = `background-image: url("${this.source.cover}"); background-position: 50% 50%;`
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .StreamItem {
    border-bottom: 1px solid rgb(230, 236, 240);
    padding-left: @default-min-spacing;
    padding-right: @default-min-spacing;
    padding-top: @default-min-spacing;
  }

  .StreamItem-aside {
    margin-right: @default-min-spacing;
  }

  .StreamItem-body {
    padding-bottom: @default-min-spacing;
  }

  .StreamItem-title {
    font-size: 1.2rem;
    font-weight: 600;
    font-synthesis: style;
    line-height: 1.6;
    color: #1a1a1a;
    margin-bottom: @default-min-spacing;

    a {
      color: rgba(0, 0, 0, .84);
      fill: rgba(0, 0, 0, .84);
    }
  }

  .GuButton--seed {
    letter-spacing: 1px;
    position: relative;
    width: 55px;
    height: 55px;
    outline: transparent solid 1px;
    border-radius: 50%;
    transition: border 0.1s ease-in 0s;
    padding: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
    background: rgba(0, 0, 0, 0.15);

    .seed {
      color: rgba(0, 0, 0, 0.65);
    }
  }

  .StreamItem-cover {
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

  .StreamItem-header {
    margin-top: @default-min-spacing;
  }
</style>