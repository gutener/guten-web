<template>
  <div class="">
    <headerBr/>
    <div class="">
      <HomeStreamList/>
    </div>
  </div>
</template>

<script>
  import HomeStreamList from "./components/HomeStreamList"
  import HeaderBr from '@/components/HeaderBr'
  import Search from '@/components/Search'
  export default {
    data() {
      return {
        recommend: [],
        loading: true
      };
    },
    created() {
      this.render();
    },
    methods: {
      render() {
      }
    },
    components: {
      "HomeStreamList": HomeStreamList,
      HeaderBr,
      Search
    }
  }
</script>

<style lang="less" scoped>

  .HomeStream-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
</style>
