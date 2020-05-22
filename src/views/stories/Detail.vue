<template>
  <div style="background-color: rgb(255, 255, 255); max-width: 900px; margin: 0px auto;">
    <div class="enlargeable-header" style="position: relative; text-align: left;">
      <div style="color: rgb(0, 0, 0); min-width: 0px; padding-right: 4em; text-overflow: unset; overflow: unset; white-space: unset;">
        <a href="/+nb1vrq" style="font-weight: 500; color: rgb(0, 0, 0); line-height: 1em;">{{story.title}}</a>
      </div>
      <div style="padding-top: 0.5em;">
        <a href="/max" style="text-decoration: none; color: inherit; position: relative; font-weight: 400;">
          <span class="sc-jTzLTM fwlJfY">
            <span style="position: relative; margin-left: 0px;">/max</span>
          </span>
        </a>&nbsp;
        <span style="color: rgb(170, 170, 170);">Apr.&nbsp;21&nbsp;</span>&nbsp;
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
    <div class="simple markdown-body" v-html="story.body"></div>
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
<style lang="less">
  @import "primer-markdown.less";
</style>