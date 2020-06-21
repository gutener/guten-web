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
    <div v-if='hasMore' slot="footer" class="loader">
      <div class="ant-skeleton-content">
        <h3 class="ant-skeleton-title" style="width: 38%;"></h3>
        <ul class="ant-skeleton-paragraph">
          <li></li>
          <li></li>
          <li style="width: 61%;"></li>
        </ul>
      </div>
    </div>
  </virtual-list>
</template>
<script>
  import {homeFeed} from '@/api/biz'
  import StreamItem from './StreamItem'
  import VirtualList from '@/components/VirtualScrollList'

  export default {
    data() {
      return {
        items: [],
        itemComponent: StreamItem,
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
      StreamItem,
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
                val.id=val.target.item_id
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