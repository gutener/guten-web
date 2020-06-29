<template>
  <div class="main-layout align-items-start flex-grow1 gu-aside-width paddingtop10">
    <div class="main-layout">
      <Search
              v-on:selected="validateSelection"
              v-on:filter="getDropdownValues"
              :disabled="false"
              name="zipcode"
              :maxItem="10"
              placeholder="搜索 Guten">
      </Search>
      <div class="main-layout">
        <aside class="main-layout page-aside-width">
          <HashTag/>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from '@/components/Search'
  import HashTag from '@/components/HashTag'

  export default {
    components: {
      Search,
      HashTag
    },
    methods: {
      validateSelection(val) {
        console.log(val.id + '-' + val.name)
      },
      getDropdownValues(val) {
        console.log(val)
      }

    }
  }
</script>
<style lang="less" scoped>
  @import url('../global.less');
</style>
