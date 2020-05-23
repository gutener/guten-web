<template>
  <div class="HotStory-mainColumnCard">
    <div class="HotStory-content">
      <div class="HotStory-recommend">
        <div class="Card HotstoryItem HotstoryItem-isRecommend" v-for="story in stories" :key="story.id">
          <hp-card
            :url=story.url
            :title=story.target.title
            :excerpt=story.target.excerpt
            :body=story.target.body>
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
              this.stories.forEach((val) => {
                val.url=`/stories/${val.target.id}`
              })
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