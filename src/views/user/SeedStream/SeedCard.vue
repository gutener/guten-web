<template>
  <div>
    {{source.seed_time}}
    {{source.target.title}}
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    name:"user-seed-card",
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
        let seedTime = moment(this.source.seed_time)
        if(currentTime.diff(seedTime, 'days')>7){
          this.source.seed_time = seedTime.format('LL')
        }else{
          this.source.seed_time = seedTime.fromNow()
        }
        console.log(this.source)
      }
    }
  }
</script>