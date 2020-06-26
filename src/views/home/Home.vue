<template>
  <div>
    <headerBr/>
    <article class="HomeStream-container">
      <HomeStreamList/>
      <HomeAsider/>
    </article>
  </div>
</template>

<script>
  import HomeStreamList from "./components/HomeStreamList"
  import HomeAsider from "./components/HomeAsider"
  import HeaderBr from '@/components/HeaderBr'

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
      "HomeAsider": HomeAsider,
      HeaderBr
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
