<template>
  <article class="story-container">
    <section class="story-body">
      <div class="story-body-header">
        <h1><a href="javascript:;">{{story.title}}</a></h1>
        <div style="padding-top: 0.5em;">
          <span style="color: rgb(170, 170, 170);">2019年4月.&nbsp;21&nbsp;</span>&nbsp;
          <span style="color: rgb(170, 170, 170); cursor: pointer; position: relative;">
              <span style="position: relative; top: 1px;">
                <i class="far fa-ellipsis-h" aria-hidden="true"></i>
              </span>
            </span>
        </div>
        <div style="position: absolute; right: 0px; bottom: -0.3em;">
          <div class="sc-jKJlTe kfmJxr">
            <div class="sc-bwzfXH dugtJJ">
              <div class="sc-htpNat kFThih">
                <button class="sc-ifAKCX gGXPT clap" style="transform: scale(1, 1);">
                  <div class="sc-eNQAEJ bWPcPd" font-size="1em" height="40%">342<i>₲</i></div>
                  <span class="sc-EHOje dFbwpZ clap--count" style="opacity: 0; transform: scale(0);">0</span></button>
              </div>
              <button class="sc-bdVaJa QmGNf"></button>
            </div>
          </div>
        </div>
      </div>
      <div class="story-body-main">
        <div class="medium-editor" v-html="story.body"></div>
      </div>
    </section>
    <div :class="[!postSidebar ? 'post-sidebar' : 'post-sidebar show']">
      <div class="post-sidebar__maincol">
        <div class="post-sidebar__body">
          <div class="post-sidebar__actions">
            <h4>
              <button class="">342<i>₲</i></button>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="reply-container">
      <div style="color: rgb(170, 170, 170); padding: 1em 0px;">15 replies</div>
      <div class="reply-column reply-input" style="height: 100%;margin-bottom: 2rem;">
        <div class="reply-grow" style="position: relative">
          <medium-editor
                  style="background-color:#f5f5f5;min-height: 64px;"
                  v-model="reply.reply_body"
                  :options="options"
                  :onChange="onChange"
                  v-on:uploaded="uploadCallback">
          </medium-editor>
          <div style="position: absolute; bottom: 0px; right: 0px;" v-show="reply.reply_body!==''&&reply.reply_body!=='<p><br></p>'">
            <button @click="saveReply">
              <svg-icon iconClass="upload" style="font-size:26px"></svg-icon>
            </button>
          </div>
        </div>
      </div>
      <section v-for="reply in replies" :key="reply.id">
        <div style="border-radius: 3px; border: 1px solid rgb(221, 221, 221); margin-bottom: 1em; padding-right: 1em;">
          <div style="padding: 1rem 1.25em;" v-html="reply.reply_body"></div>
          <div style="color: rgb(170, 170, 170); padding-left: 1.5em; padding-bottom: 0.5em; cursor: pointer;">
            <div class="sc-fAjcbJ cfvcJF">
              <svg-icon iconClass="share" style="font-size:23px"></svg-icon>
            </div>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>
<script>
  import {getStory, postReply,listReliesByStory} from '@/api/biz'
  import Editor from '@/components/medium-editor/Editor'

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.story.id = to.params.id
        vm.getStoryInfo(vm.story.id)
        vm.listRelies(vm.story.id)
      })
    },
    data() {
      return {
        story: {
          id:'',
          body: '',
          title: ''
        },
        postSidebar:false,
        options: {
          uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/story/rich_text/v1/uploadimg`,
          placeholder:{
            text:'回复'
          }
        },
        reply:{
          reply_body:'',
          story_id:''
        },
        reply_button:false,
        replies:[]
      }
    },
    components: {
      "medium-editor": Editor
    },
    mounted() {
      window.addEventListener("scroll", this.getScroll)
    },
    methods: {
      getStoryInfo(id) {
        getStory(id)
            .then(response => {
              this.story.body = response.body
              this.story.title = response.title
            })
            .catch(error => {
              console.error(error)
            })
      },
      onLoad() {

      },
      uploadCallback(url) {
        // console.log("uploaded url", url)
      },
      onChange(){
        console.log(this.reply.reply_body)
      },
      saveReply(){
        this.reply.story_id = this.story.id
        postReply(this.reply)
            .then(response => {
              this.listRelies(this.story.id)
              this.reply.reply_body=null
            })
            .catch(error => {

            })
      },
      listRelies(storyId){
        listReliesByStory(storyId)
            .then(replyRep => {
              this.replies=replyRep
            })
            .catch(error => {
              console.error(error)
            })
      },
      //监听滚动
      getScroll() {
        document.documentElement.scrollTop >= 152?this.postSidebar = true:this.postSidebar = false
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "detail-content.less";
</style>