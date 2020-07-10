<template>
  <div class="main-layout padding-default">
    <div class="main-layout">
      <div class="main-layout flex-row align-items-center header-row-height">
        <div class="main-layout justify-between">
          <svg-icon iconClass="back"></svg-icon>
        </div>
        <div class="main-layout align-items-start">
          <h2>短文本</h2>
        </div>
      </div>
    </div>
    <div class="main-layout ">
      <div class="short_text_body font-large-size" v-html="shortText.body"></div>
    </div>
    <div class="main-layout font-light">
      {{shortText.create_time}}
    </div>
    <div class="main-layout flex-row justify-between marginTop10">
      <div role="button" @click="openReplyEdit" class="flex-row" style="font-size: 18px">
        <svg-icon class="min-marginRight" iconClass="comment"></svg-icon>
        <span class="min-marginLeft">199</span>
      </div>
      <div role="button" class="flex-row" style="font-size: 18px">
        <svg-icon class="min-marginRight" iconClass="retweet"></svg-icon>
        <span class="min-marginLeft">199</span>
      </div>
      <div role="button" class="flex-row" style="font-size: 18px">
        <svg-icon class="min-marginRight" iconClass="G"></svg-icon>
        <span class="min-marginLeft">199</span>
      </div>
    </div>
    <div class="main-layout" v-show="editReply">
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
</template>
<script>
  import {getItemById, postReply} from '@/api/biz'
  import moment from "moment"
  import Editor from '@/components/medium-editor/Editor'

  export default {
    data() {
      return {
        shortText: {
          body: '',
          create_time: ''
        },
        editReply:false,
        options: {
          uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/item/1.0/image/upload?type=item`,
          placeholder: {
            text: '发布你的想法'
          }
        },
        reply:{}
      }
    },
    components: {
      "medium-editor": Editor
    },
    created() {
      this.getItemDetail()
      this.render()

    },
    methods: {
      render() {
      },
      getItemDetail() {
        const itemId = this.$route.params.st_id
        getItemById(itemId)
            .then(response => {
              this.shortText.body = response.target.body
              this.shortText.id = response.id
              this.shortText.create_time = response.target.create_time
              const currentTime = moment()
              let creatTime = moment(this.shortText.create_time)
              if (currentTime.diff(creatTime, 'days') > 7) {
                if (currentTime.format('YYYY') === creatTime.format('YYYY')) {
                  this.shortText.create_time = creatTime.format("MMMDo")
                } else {
                  this.shortText.create_time = creatTime.format("LL")
                }
              } else {
                this.shortText.create_time = creatTime.fromNow()
              }
            })
            .catch(error => {
              console.error(error)
            })
      },
      openReplyEdit(){
        this.editReply=!this.editReply
        console.log(this.editReply)
      },
      uploadCallback(url) {
        // console.log("uploaded url", url)
      },
      onChange(content) {
        this.reply.body = content
      },
      saveReply() {
        this.reply.item_id = this.shortText.id
        postReply(this.reply)
            .then(response => {
              this.listRelies(this.story.id)
              this.$refs.replyContainer.$refs.editor.innerHTML = ''
            })
            .catch(error => {

            })
      },
    }
  }
</script>
<style lang="less" scoped>
  @whatever: ~">>>";
  .short_text_body {
    @{whatever} p {
      margin-top: 0;
      margin-bottom: 0em;
    }

    @{whatever} ol {
      margin: 0 24px;
    }
  }
</style>