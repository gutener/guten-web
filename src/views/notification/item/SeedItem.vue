<template>
  <div class="seed">
    <div class="notification-header">
      <div class="avatar">
        <img :src="data.user.avatar" class="avatar-image" style="width: 32px;height: 32px;"
             :alt="data.user.nick_name">
      </div>
      <div>
        <span>{{data.create_time}} </span>
        <span style="font-weight: 700">{{data.user.nick_name}}</span>
        seed你的文章：
      </div>
    </div>
    <article class="">
      <h1>{{data.target.title}}</h1>
    </article>
  </div>
</template>
<script>
  import moment from 'moment'

  export default {
    name: "seed-card",
    props: {
      data: {
        type: Object,
        default() {
          return {}
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
        let seedTime = moment(this.data.time)
        if (currentTime.diff(seedTime, 'days') > 7) {
          this.data.create_time = seedTime.format('LL')
        } else {
          this.data.create_time = seedTime.fromNow()
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import url('../../../components/global.less');

  .notification-header {
    margin-bottom: 4px;
    color: @font-light-color;
  }
</style>