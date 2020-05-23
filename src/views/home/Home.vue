<template>
  <article class="Hotstory-container">
    <section class="HotStory-mainColumn">
      <HotStoriesList/>
    </section>
    <HomeAsider/>
  </article>
</template>
<script>
  import HotStoriesList from "./components/HotStoriesList"
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
      "HotStoriesList": HotStoriesList,
      "HomeAsider": HomeAsider
    }
  };
</script>
<style lang="less" scoped>
  .Hotstory-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    width: 1000px;
    padding: 0 16px;
    margin: 10px auto
  }

  .HotStory-mainColumn {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-right: 10px;
    margin-bottom: 0;
    width: 694px
  }
</style>
