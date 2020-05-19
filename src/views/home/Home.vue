<template>
  <div class="HotStory-mainColumn">
    <HotStoriesList>
    </HotStoriesList>
  </div>
</template>
<script>
  import loading from "@/components/PageHelper/Loading"
  import HotStoriesList from "./components/HotStoriesList"

  export default {
  name: "home",
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
    zhSelect() {
      this.hiddenBtn = this.hiddenBtn ? false : true
    },
    render(){

    }
  },
  components: {
    "zh-loading": loading,
    "HotStoriesList": HotStoriesList
  }
};
</script>

<style lang="less" scoped>
  .HotStory-mainColumn {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-right: 10px;
    margin-bottom: 0;
    width: 694px
  }
</style>
