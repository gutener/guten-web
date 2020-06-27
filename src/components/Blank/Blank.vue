<template>
  <div class="main-layout main-blank">
    <div class="main-layout">
      <div class="">
        <div style="text-align: center;font-size: 1.3rem;font-weight: 500;margin-bottom: 12px;">
          <span class="">这里暂时没有内容</span></div>
        <div style="text-align: center;font-size: 0.9rem;color: rgba(0, 0, 0, 0.45);">
          <span class="">{{Msg}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:"Blank",
    props: {
      Msg: {
        type: String,
      }
    },
  }
</script>