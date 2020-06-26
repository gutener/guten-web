<template>
  <div>
    <div>
      <div class="avatar">
        <img :src="source.user.avatar" class="avatar-image" style="width: 32px;height: 32px;" :alt="source.user.nick_name">
      </div>
      <span>{{source.user.nick_name}} {{source.create_time}} seed你的文章：</span>
    </div>
    <article class="">
      <h1>{{source.target.title}}</h1>
    </article>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    name:"seed-card",
    props: {
      source: {
        type: Object,
        default () {
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
        const currentTime=moment()
        let seedTime = moment(this.source.time)
        if(currentTime.diff(seedTime, 'days')>7){
          this.source.create_time = seedTime.format('LL')
        }else{
          this.source.create_time = seedTime.fromNow()
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import url('../../components/global.less');
</style>