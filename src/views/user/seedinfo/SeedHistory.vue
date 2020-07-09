<template>
  <div class="main-layout">
    <div class="main-layout">
      <div class="main-layout flex-row paddingRight15 paddingLeft15 header-row-height">
        <div class="main-layout">
          <svg-icon iconClass="back" style="font-size:19px"></svg-icon>
        </div>
        <div class="main-layout align-items-start">
          <h2>{{userInfo().nick_name}}</h2>
          <div class="">
            <span class="font-light">@{{userInfo().user_name}}</span>
          </div>
        </div>
      </div>
    </div>
    <tabs style="height: 53px;">
      <tab title="SEEDING" url="urlItem" active></tab>
      <tab title="SEEDED" url="urlShortText"></tab>
    </tabs>
    <SeedList :user-name="userName"/>
  </div>
</template>
<script>
  import {Tab, Tabs} from '@/components/Tabs/tabs'
  import SeedList from './SeedList'
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        userName: ''
      }
    },
    created() {
      this.render()
    },
    components: {
      Tabs,
      Tab,
      SeedList
    },
    methods: {
      ...mapGetters(['userInfo']),
      render() {
        this.userName = this.$route.params.username
      }
    }
  }
</script>