<template>
  <virtual-list class="main-layout"
                ref="list"
                :data-key="'id'"
                :data-sources="items"
                :data-component="itemComponent"
                :estimate-size="70"
                :item-class="'streamItem'"
                :footer-class="'loader-wrapper'"
                :scrollToBottom="onScrollToBottom"
  >
  </virtual-list>
</template>
<script>
  import {queryTagTrend} from '@/api/biz'
  import VirtualList from "@/components/VirtualScrollList"
  import TagItem from "./TagItem"
  export default {
    data() {
      return {
        items: [],
        itemComponent: TagItem,
      }
    },
    components: {
      VirtualList,
      TagItem
    },
    created() {
      this.tagTrend()
    },
    methods: {
      tagTrend() {
        const param = {
          page_num: 0,
          page_size: 5
        }
        queryTagTrend(param)
            .then(response => {
              this.items =response
              console.log(this.items)
            })
            .catch(error => {
              console.error(error)
            })
      },
      onScrollToBottom(){

      }
    }
  }
</script>