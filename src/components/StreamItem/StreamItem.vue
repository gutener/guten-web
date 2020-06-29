<template>
  <Story :source="source"/>
</template>
<script>
  import Story from "./Story";
  export default {
    props: {
      source: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      Story
    }
  }
</script>