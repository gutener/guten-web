<template>
  <div class="">
    <headerBr/>
    <ItemPost/>
    <div class="main-layout">
      <HomeStreamList/>
    </div>
  </div>
</template>

<script>
  import HomeStreamList from "./components/HomeStreamList"
  import HeaderBr from '@/components/HeaderBr'
  import Search from '@/components/Search'
  import ItemPost from "./components/ItemPost"

  export default {
    data() {
      return {
        recommend: [],
        loading: true
      }
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
      Search,
      ItemPost
    }
  }
</script>

