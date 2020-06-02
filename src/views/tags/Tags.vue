<template>
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
        tagName:''
      }
    }
  }
</script>