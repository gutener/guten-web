<template>

</template>
<script>
  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        console.log(to.params.username)
      })
    },
    data() {

    },
    methods: {

    }
  }
</script>