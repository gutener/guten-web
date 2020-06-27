<template>
  <div class="ContentItem story">
    <button class="GuButton GuButton--seed main-layout" style="margin-left: 12px;margin-top: 12px;">
      <span class="seed main-layout">{{source.target.reward}}<span class="main-layout" style="margin-top: -6px;"><i>₲</i></span></span>
    </button>
    <StoryItem v-if="source.type==='s'" :source="source"/>
    <ReplyItem v-else-if="source.type==='r'" :source="source"/>
  </div>
</template>
<script>
  import StoryItem from "./StoryItem"
  import ReplyItem from "./ReplyItem"
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
    components: {
      StoryItem,
      ReplyItem
    },
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
    &:hover{
      background-color: rgb(245, 248, 250);
    }
  }
  .GuButton--seed {
    letter-spacing: 1px;
    position: relative;
    width: 55px;
    height: 55px;
    outline: transparent solid 1px;
    border-radius: 50%;
    transition: border 0.1s ease-in 0s;
    padding: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
    background: rgba(0, 0, 0, 0.15);
    .seed {
      color: rgba(0, 0, 0, 0.65);
      margin-top: 8px;
    }
  }

</style>
