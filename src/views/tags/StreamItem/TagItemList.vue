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
  import {queryItemByTag} from '@/api/biz'
  import TagItem from './TagItem'
  import VirtualList from '@/components/VirtualScrollList'
  import Scroll from '@/components/Scroll'

  export default {
    data() {
      return {
        items: [],
        itemComponent: TagItem,
        pageNum: 0,
        pageSize: 5,
        hasMore: true,
      }
    },
    props: {
      tagName: {
        type: String,
        default() {
          return {}
        }
      }
    },
    created() {
      this.isLoading = false
      this.getPageData({page_num: this.pageNum, page_size: this.pageSize, tag_name: this.tagName})
    },
    components: {
      TagItem,
      VirtualList,
      'bottom-scroll': Scroll
    },
    methods: {
      getPageData(page) {
        const self = this
        queryItemByTag(page)
            .then(response => {
              let DataItems = response
              DataItems.forEach((val) => {
                val.id = val.target.id
              })
              if (DataItems.length < this.pageSize)
                this.hasMore = false
              self.items =
                  self.items.length === 0
                      ? self.items = DataItems
                      : self.items.concat(DataItems)
              self.pageNum++
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
          this.getPageData({page_num: this.pageNum, page_size: this.pageSize, tag_name: this.tagName})
        }, 500);

      }
    },
  }
</script>
<style lang="less" scoped>
</style>