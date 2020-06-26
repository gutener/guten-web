<template>
  <div class="main-layout flex-row align-items-stretch ">
    <div class="main-border align-items-start paddingtop10">
      <headerBr/>
      <tabs class="main-layout user_mainColum-tabs">
        <tab title="全部">
          <NotificationList :userId="userId"
          ></NotificationList>
        </tab>
        <tab title="提及">
          说道说道
        </tab>
      </tabs>
    </div>
    <Aside/>
  </div>

</template>
<script>
  import {Tab, Tabs} from '@/components/Tabs'
  import HeaderBr from '@/components/HeaderBr'
  import Aside from '@/components/Aside/Aside'
  import NotificationList from "./NotificationList"
  import {mapGetters} from "vuex";
  export default {
    data() {
      return {
        userId:''
      }
    },
    components: {
      Tabs,
      Tab,
      'headerBr': HeaderBr,
      Aside,
      NotificationList
    },
    created() {
      this.render()
    },
    methods: {
      ...mapGetters(['userInfo']),
      render(){
        this.userId = this.userInfo().user_id
      }
    }
  }
</script>