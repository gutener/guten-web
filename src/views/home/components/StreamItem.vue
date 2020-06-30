<template>
  <div class="main-layout">
    <StoryCard v-if="source.type==='s'" :source="story" :activeBookmark="true"/>
    <ReplyCard v-if="source.type==='r'" :source="reply"/>
  </div>
</template>
<script>
  import StoryCard from "@/components/StoryCard"
  import ReplyCard from "@/components/ReplyCard"

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
        reply:{}
      }
    },
    components: {
      StoryCard,
      ReplyCard
    },
    created() {
      this.render()
    },
    methods: {
      render() {
        if (this.source.type === 's') {
          this.story = this.source.target
          this.story.id = this.source.target.item_id
          if (!!this.source.seeded_user) {
            this.story.seed_user = this.source.seeded_user
          }
          if (!!this.source.author) {
            this.story.creator = this.source.author
          }
        }
        if (this.source.type === 'r') {
          this.reply = this.source.target
          this.reply.id = this.source.target.item_id
        }
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
