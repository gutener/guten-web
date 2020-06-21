<template>
  <article class="HomeStream-container">
    <HomeStreamList/>
    <HomeAsider/>
  </article>
</template>

<script>
  import HomeStreamList from "./components/HomeStreamList"
  import HomeAsider from "./components/HomeAsider"

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
      "HomeAsider": HomeAsider
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
    max-width: 1032px;
    width: 100%;
    margin: 0 auto;
  }
</style>
