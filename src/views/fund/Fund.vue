<template>
  <div class="Fund-main">
    <div class="Fund Fund-header flex">
      <router-link class="Header-grow active" to="/seed">
        <div style="color: rgb(170, 170, 170);">SEED</div>
        <div style="font-size: 150%; color: rgb(71, 102, 65);">
          <span style="font-family: Cartograph-Mono;">
            0.00₲
          </span>
        </div>
      </router-link>
      <a class="Header-grow">
        <div style="color: rgb(170, 170, 170);font-size: 20px;font-weight: 500;">充值</div>
        <div style="font-size: 150%;">
          <span style="font-family: Cartograph-Mono;">
            0.00₲
          </span>
        </div>
      </a>
      <a class="Header-grow">
        <div style="color: rgb(170, 170, 170);">SPOT</div>
        <div style="font-size: 150%;">
          <span style="font-family: Cartograph-Mono;">
            0.00₲
          </span>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    components: {}
  }
</script>
<style lang="less" scoped>
  @import "Fund.less";
</style>