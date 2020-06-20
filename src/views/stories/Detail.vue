<template>
  <article class="story-container">
    <section class="story-body">
      <div class="story-body-header">
        <h1><a href="javascript:;">{{story.title}}</a></h1>
        <div style="padding-top: 0.5em;">
          <span style="color: rgb(170, 170, 170);">{{story.create_time}}&nbsp;</span>&nbsp;
          <span style="color: rgb(170, 170, 170); cursor: pointer; position: relative;">
              <span style="position: relative; top: 1px;">
              </span>
            </span>
        </div>
        <div style="position: absolute; right: 0px; bottom: -0.3em;">
          <div class="">
            <div class="">
              <div class="">
                <button class="" @click="seed">
                  <svg-icon iconClass="seeding" style="font-size:22px"></svg-icon>
                  <div class="" font-size="1em" height="40%">{{story.reward}}<i>₲</i></div>
                  <span class="" style="opacity: 0; transform: scale(0);">0</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="story-body-main medium-editor-container">
        <div class="medium-editor" v-html="story.body"></div>
      </div>
    </section>
    <div :class="[!postSidebar ? 'post-sidebar' : 'post-sidebar show']">
      <div class="post-sidebar__maincol">
        <div class="post-sidebar__body">
          <div class="post-sidebar__actions">
            <div class="post-sidebar__section" style="margin-bottom: 20px;width: 36px;">
              <a-popover trigger="hover" placement="right" :destroyTooltipOnHide=true>
                <div class="" @click="seed">{{story.reward}}<i>₲</i></div>
                <template slot="content">
                  <div @click="" style="cursor: pointer">seed to creator</div>
                  <div @click="seed" style="cursor: pointer;margin-top:6px">set reward to story</div>
                </template>
              </a-popover>
            </div>
            <div class="post-sidebar__section">eee</div>
          </div>
        </div>
      </div>
    </div>
    <div class="reply-container">
      <div style="color: rgb(170, 170, 170); padding: 1em 0px;">15 replies</div>
      <div class="reply-column reply-input" style="height: 100%;margin-bottom: 2rem;">
        <div class="reply-grow" style="position: relative">
          <medium-editor
                  ref="replyContainer"
                  style="background-color:#f5f5f5"
                  :options="options"
                  :onChange="onChange"
                  v-on:uploaded="uploadCallback">
          </medium-editor>
          <div style="position: absolute; bottom: 0px; right: 0px;"
               v-show="reply.reply_body!==''&&reply.reply_body!=='<p><br></p>'">
            <button @click="saveReply">
              <svg-icon iconClass="upload" style="font-size:26px"></svg-icon>
            </button>
          </div>
        </div>
      </div>
      <section class="streamItem " v-for="reply in replies" :key="reply.target.id">
        <div class="reply-section">
          <div class="gu-clearfix reply-header">
            <div class="gu-floatLeft">
              <a v-if="!!reply.author">{{reply.author.nick_name}}</a>
              <div style="font-size: 0.8rem;color: rgba(0, 0, 0, 0.45);margin-top: 2px;">
                {{reply.target.create_time}}
              </div>
            </div>
            <div class="gu-floatRight">
              <a class="" @click="seedReply(reply.target)">{{reply.target.seed}}<i>₲</i></a>
            </div>
          </div>
          <div class="reply-body" v-html="reply.target.reply_body"></div>
          <div style="color: rgb(170, 170, 170); padding-left: 1rem; padding-bottom: 0.5rem; cursor: pointer;">
            <div class="">
              <svg-icon iconClass="share" style="font-size:23px"></svg-icon>
            </div>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>
<script>
  import {getStory, listReliesByStory, postReply, seedStory,seedReply} from '@/api/biz'
  import Editor from '@/components/medium-editor/Editor'
  import moment from 'moment'

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
          id: '',
          body: '',
          title: '',
          reward: 0,
          create_time: ''
        },
        postSidebar: false,
        options: {
          uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/story/images/1.0/?type=g-st`,
          placeholder: {
            text: '回复'
          }
        },
        reply: {
          reply_body: '',
          story_id: '',
          reward:0
        },
        reply_button: false,
        replies: []
      }
    },
    components: {
      "medium-editor": Editor
    },
    mounted() {
      window.addEventListener("scroll", this.getScroll)
    },
    methods: {
      moment: function (date) {
        return moment(date)
      },
      getStoryInfo(id) {
        getStory(id,'app_detail')
            .then(response => {
              this.story.body = response.body
              this.story.title = response.title
              this.story.reward = response.reward
              this.story.create_time = moment(response.create_time).fromNow()
            })
            .catch(error => {
              console.error(error)
            })
      },
      /**
       * seed to story
       */
      seed() {
        const storyId = this.story.id
        seedStory(storyId)
            .then(response => {
              console.log(response)
              this.story.reward = response
            })
            .catch(error => {
              if(!!error.response.data){
                const errorData = error.response.data
                if(errorData.error_code===9001){

                }
              }
              console.error(error)
            })
      },
      seedReply(reply){
        seedReply(reply.id)
            .then(response => {
              reply.reward = response
            })
            .catch(error => {
              if(!!error.response.data){
                const errorData = error.response.data
                if(errorData.error_code===9001){

                }
              }
              console.error(error)
            })
      },
      uploadCallback(url) {
        // console.log("uploaded url", url)
      },
      onChange(content) {
        this.reply.reply_body = content
      },
      saveReply() {
        this.reply.story_id = this.story.id
        this.reply.story_title = this.story.title
        const self = this
        postReply(this.reply)
            .then(response => {
              this.listRelies(this.story.id)
              self.$refs.replyContainer.$refs.editor.innerHTML = ''
            })
            .catch(error => {

            })
      },
      listRelies(storyId) {
        const params ={
          story_id:storyId,
          page_num:0,
          page_size:5
        }
        listReliesByStory(params)
            .then(replyRep => {
              this.replies = replyRep
              this.replies.forEach((val) => {
                val.target.create_time = moment(val.target.create_time).fromNow()
              })
            })
            .catch(error => {
              console.error(error)
            })
      },
      //监听滚动
      getScroll() {
        document.documentElement.scrollTop >= 252 ? this.postSidebar = true : this.postSidebar = false
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../components/medium-editor/themes/default";
  @import "detail-content.less";
</style>