<template>
  <div class="align-items-start paddingtop10">
    <headerBr/>
    <tabs style="height: 53px;">
      <tab title="全部" url="/notifications"></tab>
      <tab title="提及" url="/notifications/mentions" active></tab>
    </tabs>
    <div class="">
      <div class="">
        <div class="">
          <div dir="auto"
               class="">
            <span class="">这里暂时没有内容</span></div>
          <div dir="auto"
               class="">
            <span class="">当有人提及你时，你会在这里找到它。</span></div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import {Tab, Tabs} from '@/components/Tabs'
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