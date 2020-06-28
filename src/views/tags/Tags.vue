<template>
  <div class="main-layout paddingtop10">
    <div class="main-layout">
      <div class="main-layout flex-row row-height" style="margin: 0 24px;">
        <div @click="$router.go(-1)" role="button" class="main-layout justify-center" style="min-width: 59px;">
          <svg-icon iconClass="back" class="" style="font-size:22px"></svg-icon>
        </div>
        <div class="main-layout align-items-start justify-center" style="width: 340px;">
          <Search style="width: 100%;"
                  v-on:selected="validateSelection"
                  v-on:filter="getDropdownValues"
                  :disabled="false"
                  :init-value="hashValue"
                  :maxItem="10"
                  placeholder="搜索...">
          </Search>
        </div>
      </div>
      <tabs class="">
        <tab title="热门" :url="mainUrl" active></tab>
        <tab title="用户" :url="userUrl"></tab>
      </tabs>
    </div>
    <div class="main-layout">
      <StoryItemList/>
    </div>
  </div>
</template>
<script>
  import Search from '@/components/Search'
  import {Tab, Tabs} from '@/components/Tabs/tabs'
  import StoryItemList from "@/views/tags/story/StoryItemList";

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.hashValue = to.params.tagName
      })
    },
    components: {
      Tabs,
      Tab,
      Search,
      StoryItemList
    },
    data() {
      return {
        mainUrl: '',
        userUrl: '',
        hashValue: '',
        followText: '',
      }
    },
    created() {
      this.render()
    },
    methods: {
      goback(){

      },
      render() {
        this.hashValue = `#${this.$route.params.tagName}`
        this.mainUrl = `/hashtag/${this.$route.params.tagName}?src=hashtag_click`
        this.userUrl = `/hashtag/${this.$route.params.tagName}?src=hashtag_click&f=user`
      },
      validateSelection(val) {
      },
      getDropdownValues(val) {
      }
    }
  }
</script>