<template>
  <section class="">
    <Profile :userName="userName"/>
    <tabs style="height: 53px;">
      <tab title="全部" :url="urlItem"></tab>
      <tab title="回复" url="/notifications"></tab>
      <tab title="媒体" :url="urlMedia" active></tab>
    </tabs>
  </section>
</template>
<script>
  import {Tab, Tabs} from '@/components/Tabs/tabs'
  import Profile from "./Profile"

  export default {
    data() {
      return {
        userName: '',
        urlItem: '',
        urlMedia:''
      }
    },
    components: {
      Tabs,
      Tab,
      Profile
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