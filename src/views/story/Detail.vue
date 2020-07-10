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
                <SeedButton :reward="story.reward" @seedClick="seed"></SeedButton>
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
                <div class="seed" @click="seed">{{story.reward}}<i>₲</i></div>
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
      <div style="color: rgb(170, 170, 170); padding: 1em 0px;">{{story.reply_count}} 回复</div>
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
               v-show="reply.body!==''&&reply.body!=='<p><br></p>'">
            <button @click="saveReply">
              <svg-icon iconClass="upload" style="font-size:26px"></svg-icon>
            </button>
          </div>
        </div>
      </div>
      <section class="streamItem " v-for="reply in replies" :key="reply.id">
        <div class="reply-section">
          <div class="gu-clearfix reply-header">
            <div class="gu-floatLeft">
              <a v-if="!!reply.creator">{{reply.creator.nick_name}}</a>
              <div style="font-size: 0.8rem;color: rgba(0, 0, 0, 0.45);margin-top: 2px;">
                {{reply.create_time}}
              </div>
            </div>
            <div class="gu-floatRight">
              <a class="" @click="seedReply(reply)">{{reply.reward}}<i>₲</i></a>
            </div>
          </div>
          <div class="reply-body" v-html="reply.body"></div>
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
  import {domTitle, setDocumentTitle} from '@/utils/domUtil'
  import {getItemById, listReliesByItem, postItem, seedReply, seedItem} from '@/api/biz'
  import Editor from '@/components/medium-editor/Editor'
  import moment from 'moment'
  import SeedButton from "@/components/Button/SeedButton";

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
          uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/item/1.0/image/upload?type=item`,
          placeholder: {
            text: '回复'
          }
        },
        reply: {
          body: '',
          story_id: '',
          reward: 0
        },
        reply_button: false,
        replies: []
      }
    },
    components: {
      SeedButton,
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
        const params={
          item_type:'s'
        }
        getItemById(id, params)
            .then(response => {
              setDocumentTitle(`${response.title} / ${domTitle}`)
              this.story.id = response.target.id
              this.story.body = response.target.body
              this.story.title = response.target.title
              this.story.reward = response.reward
              this.story.reply_count = response.target.reply_count
              this.story.create_time = moment(response.target.create_time).fromNow()
            })
            .catch(error => {
              console.error(error)
            })
      },
      /**
       * seed to story
       */
      seed() {
        const itemId = `s${this.story.id}`
        seedItem(itemId)
            .then(response => {
              this.story.reward = response
            })
            .catch(error => {
              if (!!error.response.data) {
                const errorData = error.response.data
                if (errorData.error_code === 9001) {

                }
              }
              console.error(error)
            })
      },
      seedReply(reply) {
        seedReply(reply.id)
            .then(response => {
              reply.reward = response
            })
            .catch(error => {
              if (!!error.response.data) {
                const errorData = error.response.data
                if (errorData.error_code === 9001) {

                }
              }
              console.error(error)
            })
      },
      uploadCallback(url) {
        // console.log("uploaded url", url)
      },
      onChange(content) {
        this.reply.body = content
      },
      saveReply() {
        this.reply.item_type='r'
        this.reply.source_item_id = this.story.id
        const self = this
        postItem(this.reply)
            .then(response => {
              this.listRelies(this.story.id)
              self.$refs.replyContainer.$refs.editor.innerHTML = ''
            })
            .catch(error => {

            })
      },
      listRelies(storyId) {
        const params = {
          story_id: storyId,
          page_num: 0,
          page_size: 5
        }
        listReliesByStory(params)
            .then(replyRep => {
              this.replies = replyRep
              this.replies.forEach((val) => {
                val.create_time = moment(val.create_time).fromNow()
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