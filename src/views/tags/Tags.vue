<template>
  <div>

    {{this.tagName}}
    <a @click="handlefollow" class="GuButton GuButton--color GuButton--small" rel="noopener">{{followText}}</a>
  </div>
</template>
<script>
  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.tagName = to.params.tagName
      })
    },
    data() {
      return {
        tagName:'',
        followText:'',
      }
    },
    created() {
      this.render()
    },
    methods: {
      render(){

      },
      changeFollowText(){
        if(this.user.is_followed===0){
          this.followText="关注"
        }else if(this.user.is_followed===1){
          this.followText="正在关注"
        }
      },
    }
  }
</script>