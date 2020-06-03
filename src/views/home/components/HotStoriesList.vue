<template>
  <virtual-list class="HomeStream-mainColumn"
                ref="list"
                :data-key="'id'"
                :data-sources="items"
                :data-component="itemComponent"
                :estimate-size="70"
                :item-class="'streamItem'"
                :footer-class="'loader-wrapper'"
                :scrollToBottom="onScrollToBottom"
  >
    <div v-show='hasMore' slot="footer" class="loader"></div>
  </virtual-list>
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
        if(this.$el.offsetTop<=10&&this.hasMore){
          this.onScrollToBottom()
        }
      },
      onScrollToBottom() {
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
</style>