<template>
  <div class="main-layout flex-row padding-default paddingTop10 paddingBottom10 short-text-card">
    <div class="main-layout align-items-center">
      <button class="GuButton GuButton--seed">
        <span class="seed">{{shortText.reward}}<span class="main-layout"
                                                     style="margin-top: -6px;"><i>₲</i></span></span>
      </button>
    </div>
    <div role="button" class="marginLeft10">
      <div class="main-layout flex-row">
        <div class="main-layout font-light">
          <span class="light-bar">{{shortText.create_time}}</span>
        </div>
      </div>
      <div @click="openDetail" class="">
        <div class="main-layout default-line-height" v-html="shortText.body"></div>
      </div>
      <div class="main-layout flex-row justify-between marginTop10">
        <div role="button" class="flex-row">
          <svg-icon iconClass="retweet" style="font-size: 18px;"></svg-icon>
        </div>
        <div role="button" class="flex-row">
          <svg-icon iconClass="dislike" style="font-size: 19px;"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from "moment";

  export default {
    name: "short-text-card",
    props: {
      source: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        shortText: {},
        stUrl: ''
      }
    },
    created() {
      this.render()
    },
    methods: {
      render() {
        this.shortText = this.source.target
        const currentTime = moment()
        let creatTime = moment(this.shortText.create_time)
        if (currentTime.diff(creatTime, 'days') > 7) {
          if (currentTime.format('YYYY') === creatTime.format('YYYY')) {
            this.shortText.create_time = creatTime.format("MMMDo")
          } else {
            this.shortText.create_time = creatTime.format("LL")
          }
        } else {
          this.shortText.create_time = creatTime.fromNow()
        }
      },
      openDetail() {
        this.stUrl = `/creation/${this.source.id}`
        this.$router.push(this.stUrl)
      }
    }
  }
</script>
<style lang="less" scoped>
  .short-text-card {
    border-bottom: 1px solid rgb(230, 236, 240) !important;

    &:hover {
      background-color: rgb(245, 248, 250);
    }
  }
</style>