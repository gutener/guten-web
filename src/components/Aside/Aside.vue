<template>
  <div class="main-layout flex-row aside-width paddingtop10">
    <div class="main-layout">
      <Search
              :options="[{ id: 1, name: 'Option 1'}, { id: 2, name: 'Option 2'}]"
              v-on:selected="validateSelection"
              v-on:filter="getDropdownValues"
              :disabled="false"
              name="zipcode"
              :maxItem="10"
              placeholder="搜索 Guten">
      </Search>
      <div class="main-layout">
        <aside class="main-layout page-aside-width">
          <a class="gu-link">
            <div class="gu-flexCenter gu-borderBottomLighter homeAsider_title">
              <h3 class="ui-h2">Popular on GUTEN</h3>
            </div>
          </a>
          <ol class="gu-padding32">
            <li class="gu-flex gu-marginBottom24">
              <div class="gu-fontSize32 gu-textColorLighter">01</div>
              <div>
                <a>
                  <h2 class="ui-h4 ui-clamp3 u-marginBottom4">Coronavirus May Be a Blood Vessel Disease, Which Explains
                    Everything</h2>
                </a>
              </div>
            </li>
          </ol>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from '@/components/Search'

  export default {
    components: {
      Search
    },
    methods:{
      validateSelection(val){
        console.log(val.id+'-'+val.name)
      },
      getDropdownValues(val){
        console.log(val)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import url('../global.less');

  .aside-width {
    width: 350px;
  }


</style>
