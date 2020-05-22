<template>
  <div class="HotStory-mainColumnCard">
    <div class="HotStory-content">
      <div class="HotStory-recommend">
        <div class="Card HotstoryItem HotstoryItem-isRecommend" v-for="item in stories" :key="item.id">
          <hp-card
            :id=item.id
            :title=item.title
            :body=item.body>
          </hp-card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import {cdsHp} from '@/api/biz'
  import StoryCard from './StoryCard'
  export default {
    data() {
      return {
        stories:[]
      }
    },
    created(){
      this.getDataCds()
    },
    components: {
      "hp-card":StoryCard
    },
    methods: {
      getDataCds(){
        cdsHp()
            .then(response => {
              this.stories=response
            })
            .catch(error => {
              console.error(error)
            })
      },
    }
  }
</script>
<style lang="less" scoped>
  @import url('Story.less');
</style>