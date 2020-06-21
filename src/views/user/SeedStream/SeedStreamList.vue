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
    <div v-show='hasMore' slot="footer" class="loader">
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
  import {userSeed} from '@/api/biz'
  import VirtualList from '@/components/VirtualScrollList'
  import SeedCard from "./SeedCard"

  export default {
    data() {
      return {
        items: [],
        itemComponent: SeedCard,
        pageNum: 0,
        pageSize: 5,
        hasMore: true
      }
    },
    props: {
      userId: {
        type: String
      }
    },
    components: {
      VirtualList,
      SeedCard
    },
    mounted() {
      window.addEventListener("scroll", this.getScroll)
    },
    created() {
      this.getPageData({user_id:this.userId,page_num: this.pageNum, page_size: this.pageSize})
    },
    methods: {
      getPageData(param) {
        userSeed(param)
            .then(response => {
              let DataItems = response
              DataItems.forEach((val) => {
                val.id = val.target.id
              })
              if(DataItems.length<this.pageSize)
                this.hasMore=false
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
      getScroll() {
        if (this.$el.offsetTop <= 10 && this.hasMore) {
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
          this.getPageData({user_id:this.userId,page_num: this.pageNum, page_size: this.pageSize})
        }, 1000);

      }
    }
  }
</script>