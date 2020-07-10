<template>
  <bottom-scroll @on-bottom="onScrollToBottom" :debounce="200" :offset="0">
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
  </bottom-scroll>
</template>
<script>
  import {homeFeed} from '@/api/biz'
  import StreamItem from './StreamItem'
  import VirtualList from '@/components/VirtualScrollList'
  import Scroll from '@/components/Scroll'

  export default {
    data() {
      return {
        items: [],
        itemComponent: StreamItem,
        pageNum: 0,
        pageSize: 5,
        hasMore: true,
      }
    },
    created() {
      this.isLoading = false
      this.getPageData({page_num: this.pageNum, page_size: this.pageSize})
    },
    components: {
      StreamItem,
      VirtualList,
      'bottom-scroll': Scroll
    },
    methods: {
      getPageData(page) {
        homeFeed(page)
            .then(response => {
              let DataItems = response
              if (DataItems.length < this.pageSize)
                this.hasMore = false
              this.items =
                  this.items.length === 0
                      ? this.items = DataItems
                      : this.items.concat(DataItems)
              this.pageNum++
            })
            .catch(error => {
              console.error(error)
            })
      },
      onScrollToBottom() {
        if (!this.hasMore) {
          return
        }
        this.isLoading = true
        setTimeout(() => {
          this.isLoading = false
          this.getPageData({page_num: this.pageNum, page_size: this.pageSize})
        }, 500);

      }
    },
  }
</script>
<style lang="less" scoped>
</style>