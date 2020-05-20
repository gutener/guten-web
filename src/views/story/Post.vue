<template>
  <div class="PostStory-main">
    <article class="PostStory-container">
      <header class="grid PostStory-header">Post a public story</header>
      <div class="grid">
        <section class="PostStory-mainColumn">
          <div class="">
            <input class="PostStory-title" type="text" placeholder="title..."
                                               style="text-align: center; font-size: 150%; font-weight: 500;">
          </div>
          <medium-editor
                  v-model="content"
                  :options="options"
                  :onChange="onChange"
                  v-on:uploaded="uploadCallback">
          </medium-editor>
        </section>
        <aside class="PostStory-SideBar">
          <div>
          </div>
        </aside>
      </div>
    </article>
  </div>
</template>

<script>
  import Editor from '@/components/medium-editor/Editor'
  export default {
    name: "app",
    data() {
      return {
        content: ``,
        options: {
          uploadUrl: "http://localhost:3000/api/v1/upload/image"
        }
      };
    },
    components: {
      "medium-editor": Editor
    },
    methods: {
      onChange() {
        // console.log(this.content)
      },
      uploadCallback(url) {
        console.log("uploaded url", url)
      }
    }
  };
</script>

<style scoped>
  @import "~bulma/css/bulma.css";
  @import "~medium-editor/dist/css/medium-editor.css";
  @import "default.less";
  .PostStory-main{
  }
  .PostStory-container {
    width: 100%;
    max-width: 1192px;
    background-color: transparent;
    border-left: 0;
    border-right: 0;
    padding: 0 16px;
    margin: 10px auto;
  }
  .grid{
    display: flex;
  }
  .PostStory-header{
    height: 130px;
  }
  .PostStory-mainColumn{
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-right: 10px;
    margin-bottom: 0;
    -webkit-box-flex: 2;
    -ms-flex: 2 1;
    flex: 2 1;
    font-size: 14px;
  }
  .PostStory-title{
    width: 100%;
    font-family: Cartograph;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 20px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    border-radius: 12px;
    padding: 0.8em;
  }
  .PostStory-SideBar{
    -webkit-box-flex: 1;
    -ms-flex: 1 1;
    flex: 1 1;
    font-size: 14px
  }
  .editable {
    width: 100%;
    position: relative;
    flex-direction: column;
    justify-content: center;
    height: 246px;
  }
</style>
