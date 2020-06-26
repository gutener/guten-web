<template>
  <div>
    <h1>{{source.title}}</h1>
    <div v-html="source.excerpt"></div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    name:"bookmark-card",
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
        let seedTime = moment(this.source.create_time)
        if(currentTime.diff(seedTime, 'days')>7){
          this.source.create_time = seedTime.format('LL')
        }else{
          this.source.create_time = seedTime.fromNow()
        }
      }
    }
  }
</script>