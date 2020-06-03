<template>
  <div class="HotStory-mainColumnCard">
    <div class="HotStory-content">
      <!--      <div class="HotStory-recommend">-->
      <!--        <div class="Card HotstoryItem HotstoryItem-isRecommend" v-for="story in stories" :key="story.id">-->
      <!--          <hp-card-->
      <!--            :url=story.url-->
      <!--            :title=story.target.title-->
      <!--            :excerpt=story.excerpt-->
      <!--            :body=story.target.body>-->
      <!--          </hp-card>-->
      <!--        </div>-->
      <!--      </div>-->
      <virtual-list class="list-infinite scroll-touch"
                    ref="list"
                    :data-key="'id'"
                    :data-sources="items"
                    :data-component="itemComponent"

                    :estimate-size="70"
                    :item-class="'list-item-infinite'"
                    :footer-class="'loader-wrapper'"
                    :scrollToBottom="onScrollToBottom"
      >
        <div v-show='hasMore' slot="footer" class="loader"></div>
      </virtual-list>
    </div>
  </div>
</template>
<script>
  import {homeFeed} from '@/api/biz'
  import StoryCard from './StoryCard'
  import VirtualList from '@/components/VirtualScrollList'


  export default {
    data() {
      return {
        items: [],
        itemComponent: StoryCard,
        pageNum: 0,
        pageSize: 5,
        hasMore: true
      }
    },
    created() {
      this.isLoading = false
      this.getPageData({page_num: this.pageNum,page_size: this.pageSize})
    },
    components: {
      StoryCard,
      VirtualList
    },
    mounted() {
      window.addEventListener("scroll", this.getScroll)
    },
    methods: {
      getPageData(page) {
        const self = this
        homeFeed(page)
            .then(response => {
              let DataItems = response
              DataItems.forEach((val) => {
                val.url = `/stories/${val.target.id}`
                val.id = val.target.id
              })

              if(DataItems.length<this.pageSize)
                this.hasMore=false

              self.items =
                  self.items.length===0
                  ?self.items=DataItems
                  :self.items.concat(DataItems)
              self.pageNum++
            })
            .catch(error => {
              console.error(error)
            })
      },
      onScrollToTop() {
        console.log('at top')
      },
      getScroll() {
        console.log('offsetTop '+this.$el.offsetTop)
        console.log('offsetHeight '+this.$el.offsetHeight)
        if(this.$el.offsetTop<=10){
          this.onScrollToBottom()
        }
      },
      onScrollToBottom() {
        console.log('at bottom')
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        setTimeout(() => {
          this.isLoading = false
          this.getPageData({page_num: this.pageNum, page_size: this.pageSize})
        }, 1000);

      }
    }
  }
</script>
<style lang="less" scoped>
  @import url('Story.less');
  .result {
    margin-bottom: 1em;
  }
</style>