<template>
  <div class="align-items-start paddingtop10">
    <headerBr/>
    <tabs>
      <tab title="全部" url="/notifications" active></tab>
      <tab title="提及" url="/notifications/mentions"></tab>
    </tabs>
    <NotificationList :userId="userId"
    ></NotificationList>
  </div>

</template>
<script>
  import {Tab, Tabs} from '@/components/Tabs/tabs'
  import HeaderBr from '@/components/HeaderBr'
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