<template>
  <div class="main-layout">
    <StoryCard v-if="source.target_type==='STORY'" :source="source" :activeBookmark="true"/>
    <ReplyCard v-if="source.target_type==='REPLY'" :source="source"/>
    <ImageCard v-if="source.target_type==='IMAGE'" :source="source"/>
  </div>
</template>
<script>
  import StoryCard from "@/components/StoryCard"
  import ReplyCard from "@/components/ReplyCard"
  import ImageCard from "@/components/ImageCard"
  export default {
    name: "hp-card",
    props: {
      source: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        story: {},
        reply: {}
      }
    },
    components: {
      StoryCard,
      ReplyCard,
      ImageCard
    },
    created() {
      this.render()
    },
    methods: {
      render() {
      }
    }
  }
</script>
<style lang="less" scoped>
  .ContentItem {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 680px;
    width: 100%;
    border-bottom: 1px solid rgb(230, 236, 240);

    &:hover {
      background-color: rgb(245, 248, 250);
    }
  }

</style>
