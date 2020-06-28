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
  import {queryStoryByName} from '@/api/biz'
  import Search from '@/components/Search'
  import VirtualList from '@/components/VirtualScrollList'
  import Scroll from '@/components/Scroll'
  import StoryItem from "./StoryItem";

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.hashValue = to.params.tagName
      })
    },
    components: {
      Search,
      VirtualList,
      'bottom-scroll': Scroll,
      StoryItem
    },
    data() {
      return {
        mainUrl: '',
        userUrl: '',
        hashValue: '',
        followText: '',
        items: [],
        itemComponent: StoryItem,
        pageNum: 0,
        pageSize: 5,
        hasMore: true,
      }
    },
    created() {
      this.render()
    },
    methods: {
      render() {
        this.hashValue = `#${this.$route.params.tagName}`
        this.mainUrl = `/hashtag/${this.$route.params.tagName}?src=hashtag_click`
        this.userUrl = `/hashtag/${this.$route.params.tagName}?src=hashtag_click&f=user`
        this.queryStory(this.hashValue, this.pageNum, this.pageSize)
      },
      queryStory(hashVale, pageNum, pageSize) {
        const params = {
          tag_name: hashVale,
          page_num: pageNum,
          page_size: pageSize
        }
        queryStoryByName(params)
            .then(response => {
              let DataItems = response
              if (DataItems.length < this.pageSize) {
                this.hasMore = false
              }
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
          this.queryStory(this.hashValue, this.pageNum, this.pageSize)
        }, 500);

      },
      validateSelection(val) {
      },
      getDropdownValues(val) {
      }
    }
  }
</script>