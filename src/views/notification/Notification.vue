<template>
  <div class="main-layout flex-row align-items-stretch ">
    <div class="main-border align-items-start paddingtop10">
      <headerBr/>
      <tabs class="main-layout user_mainColum-tabs">
        <tab title="全部">
          ddd
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
  export default {
    components: {
      Tabs,
      Tab,
      'headerBr': HeaderBr,
      Aside
    },
  }
</script>