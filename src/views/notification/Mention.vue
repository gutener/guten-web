<template>
  <div class="align-items-start min-paddingTop">
    <headerBr/>
    <tabs style="height: 53px;">
      <tab title="全部" url="/notifications"></tab>
      <tab title="提及" url="/notifications/mentions" active></tab>
    </tabs>
    <Blank Msg="当有人@你时，你会在这里找到它。"/>
  </div>
</template>
<script>
  import {Tab, Tabs} from '@/components/Tabs/tabs'
  import Blank from '@/components/Blank'
  import HeaderBr from '@/components/HeaderBr'
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        userId: ''
      }
    },
    components: {
      Tabs,
      Tab,
      'headerBr': HeaderBr,
      Blank
    },
    created() {
      this.render()
    },
    methods: {
      ...mapGetters(['userInfo']),
      render() {
        this.userId = this.userInfo().user_id
      }
    }
  }
</script>
<style lang="less" scoped>
  /*@import url('../../components/global.less');*/
</style>