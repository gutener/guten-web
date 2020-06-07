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
  import {homeFeed} from '@/api/biz'
  import StoryCard from './StoryCard'
  import VirtualList from '@/components/VirtualScrollList'
  import moment from 'moment'

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
      moment: function (date) {
        return moment(date)
      },
      getPageData(page) {
        const self = this
        homeFeed(page)
            .then(response => {
              const currentTime=moment()
              let DataItems = response
              DataItems.forEach((val) => {
                val.url = `/stories/${val.target.id}`
                val.id = val.target.id
                val.target.seed_count = !!val.target.seed_count?`${val.target.seed_count} SEEDED`:'0 SEEDED'
                let createTime = moment(val.target.create_time)
                if(currentTime.diff(createTime, 'days')>7){
                  val.target.create_time = createTime.format('LL')
                }else{
                  val.target.create_time = createTime.fromNow()
                }
                if(!!val.author){
                  val.haveSeed = !!val.author
                  val.author.url = `/u/${val.author.user_name}`
                }

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