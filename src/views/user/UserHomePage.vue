<template>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.userName = to.params.userName
      })
    },
    data() {
      return {
        userName:''
      }
    },
    methods: {
      ...mapGetters(['nickname', 'avatar']),
    }
  }
</script>