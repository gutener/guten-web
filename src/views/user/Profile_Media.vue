<template>
  <section class="main-layout">
    <Profile :user-name="userName"/>
    <tabs style="height: 53px;">
      <tab title="全部" :url="urlItem"></tab>
      <tab title="短文本" :url="urlItem"></tab>
      <tab title="媒体" :url="urlMedia" active></tab>
    </tabs>
    <ItemList :user-name="userName" item-type="i"/>
  </section>
</template>
<script>
  import {Tab, Tabs} from '@/components/Tabs/tabs'
  import Profile from "./Profile"
  import ItemList from "./ItemList";

  export default {
    data() {
      return {
        userName: '',
        urlItem: '',
        urlMedia: ''
      }
    },
    components: {
      Tabs,
      Tab,
      Profile,
      ItemList
    },
    created() {
      this.render()
    },
    methods: {
      render() {
        this.userName = this.$route.params.username
        this.urlItem = `/u/${this.userName}`
        this.urlMedia = `/u/${this.userName}/media`
      }
    }
  }
</script>
<style lang="less" scoped>
</style>