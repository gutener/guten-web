<template>
  <div class="story-container">
    <div class="enlargeable">
      <div class="enlargeable-header">
        <div class="enlargeable-header-title">
          <a href="javascript:;" >{{story.title}}</a>
        </div>
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
                  <div class="sc-eNQAEJ bWPcPd" font-size="1em" height="40%">342¢</div>
                  <span class="sc-EHOje dFbwpZ clap--count" style="opacity: 0; transform: scale(0);">0</span></button>
              </div>
              <button class="sc-bdVaJa QmGNf"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="enlargeable">
      <div class="medium-editor" v-html="story.body"></div>
    </div>
    <div class="reply-container">
      <div style="color: rgb(170, 170, 170); padding: 1em 0px;">15 replies</div>
      <div class="reply-column" style="height: 100%;">
        <div class="reply-grow">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getStory} from '@/api/biz'

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getStoryInfo(to.params.id)
      })
    },
    data() {
      return {
        story:{
          body:'',
          title:''
        }
      }
    },
    components: {
    },
    methods:{
      getStoryInfo(id){
        getStory(id)
            .then(response => {
              this.story.body = response.body
              this.story.title = response.title
            })
            .catch(error => {
              console.error(error)
            })
      },
      onLoad(){

      }
    }
  }
</script>
<style lang="less" scoped>
  @import "detail-content.less";
</style>