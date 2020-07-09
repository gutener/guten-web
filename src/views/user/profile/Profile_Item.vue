<template>
  <section class="main-layout">
    <Profile :user-name="userName"/>
    <tabs style="height: 53px;">
      <tab title="全部" :url="urlItem" :active="!itemType"></tab>
      <tab title="短文本" :url="urlShortText" :active="itemType==='st'"></tab>
      <tab title="媒体" :url="urlMedia" :active="itemType==='i'"></tab>
    </tabs>
    <ItemList :user-name="userName" :item-type="itemType"/>
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
        urlMedia: '',
        urlShortText:'',
        itemType: null
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
        this.urlShortText = `/u/${this.userName}/short_text`
        this.getItemType()
      },
      getItemType() {
        if (this.$route.path.endsWith('media')) {
          this.itemType = 'i'
        } else if (this.$route.path.endsWith('short_text')) {
          this.itemType = 'st'
        }else{
          this.itemType=null
        }
        console.log(this.itemType)
      }
    }
  }
</script>
<style lang="less" scoped>
</style>