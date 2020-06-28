<template>
  <div class="PostStory-main">
    <article class="PostStory-container">
      <!--<header class="grid PostStory-header">Post a public story</header>-->
      <div class="display-flex">
        <section class="PostStory-mainColumn">
          <input class="PostStory-title"
                 v-model="story.title"
                 type="text" placeholder="写下你的问题,或者一个想法的题目"
                 style="text-align: center; font-size: 150%; font-weight: 500;"/>
          <medium-editor
                  style="min-height:350px;background-color: #fbfbfb;"
                  :options="options"
                  :onChange="onChange"
                  v-on:uploaded="uploadCallback">
          </medium-editor>
          <div class="StoryReward-Card">
            <div class="Reward-Header flex">
              <div class="flex-grow title">
                <span>给好的回复奖励:</span>
              </div>
              <div class="flex-shrink">
                <div class="">
                  <button class="Reward-o clap">
                    <div class="" font-size="1.05em" height="50%">₲{{reward}}</div>
                  </button>
                </div>
              </div>
            </div>
            <div class="Reward-Slide flex">
              <slide-bar
                      class="flex-siderbar"
                      v-model="reward"
                      :max="rewardMax"
                      :speed="rewardCustomzie.speed"
                      :processStyle="rewardCustomzie.processStyle"
                      :lineHeight="rewardCustomzie.lineHeight"
                      :tooltipStyles="rewardCustomzie.tooltipStyles"
              >
                <template slot="tooltip" slot-scope="tooltip" style="top: 4px;">
                  <svg-icon iconClass="radio" style="font-size: 26px;"></svg-icon>
                </template>
              </slide-bar>
              <div class="flex-plus">
                <button v-show="reward===rewardMax" v-on:click="rewardplus()">
                  <svg-icon iconClass="plus" style="font-size: 1.5rem"></svg-icon>
                </button>
              </div>
            </div>
          </div>
          <div style="text-align: center; padding-top: 1em; padding-bottom: 5em;">
            <button @click="saveStory" class="GuButton GuButton--light">发布</button>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
  import Editor from '@/components/medium-editor/Editor'
  import SlideBar from '@/components/slide-bar/SlideBar'

  import {postStory} from '@/api/biz'

  export default {
    name: "StoryPost",
    data() {
      return {
        story:{
          title:'',
          body:'',
          init_reward:0
        },
        options: {
          delay: 500,
          uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/story/images/1.0/?type=g-st`,
          placeholder:{
            text:'问题描述或者文章正文'
          },
          toolbar: {
            buttons: [
              'bold',
              'italic',
              'h1',
              'h2',
              'h3',
              'quote',
              'anchor',
              'orderedlist',
              'justifyLeft',
              'justifyCenter',
              'justifyRight',
            ]
          },
          paste: {
            /* This example includes the default options for paste,
               if nothing is passed this is what it used */
            forcePlainText: true,
            cleanPastedHTML: true,
            cleanAttrs: ['style', 'dir'],
            cleanTags: ['label', 'meta'],
            unwrapTags: ['sub', 'sup']
          },
        },
        reward: 0,
        rewardMax: 100,
        rewardCustomzie: {
          speed: 0,
          val: 4,
          lineHeight: 4,
          processStyle: {
            backgroundColor: '#42b883'
          },
          tooltipStyles: {
            backgroundColor: '#42b883',
            borderColor: '#42b883'
          }
        },
        showPlus: false
      };
    },
    components: {
      "medium-editor": Editor,
      "slide-bar": SlideBar
    },
    methods: {
      onChange(content) {
        this.story.body = content
      },
      uploadCallback(url) {
        // console.log("uploaded url", url)
      },
      rewardplus() {
        this.rewardMax = this.rewardMax + Math.ceil(this.rewardMax / 2)
      },
      saveStory(){
        this.story.init_reward = this.reward
        postStory(this.story)
            .then(response => {
              console.log(response)
              // if (response.code === 200) {
              //   let artNo = response.data
              //   this.submitForm.artNo = artNo
              //   this.saveTips = `文章已保存`;
              // } else {
              //   this.$message.error(`文章保存失败`)
              // }
            })
            .catch(error => {
              // console.error(error)
              // this.loading = false
              // this.$message.error(`文章异常，请联系客服`)
            })
      }
    }
  };
</script>

<style lang="less" scoped>
  /*@import url('../../components/global.less');*/
  .PostStory-main {
    width: @gu-main-col-width;
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

  .PostStory-header {
    height: 69px;
  }

  .PostStory-mainColumn {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-right: 10px;
    margin-bottom: 0;
    -webkit-box-flex: 2;
    -ms-flex: 2 1;
    flex: 2 1;
    font-size: 14px;
  }

  .PostStory-title {
    width: 100%;
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

  .StoryReward-Card {
    margin-top: 2.5rem;
    .flex {
      display: -webkit-flex;
      display: flex;
    }

    .Reward-Header {
      .flex-grow {
        -webkit-flex: 1 0 0;
        flex: 1 0 0;
        border-radius: 12px;
        margin-right: 0rem;
        margin-bottom: 0rem;
      }

      .title {
        font-size: 18px;
        margin-left: -2px;
        margin-top: 20px;
        color: #4c4b4b;
      }

      .flex-shrink {
        -webkit-flex: 0 1 auto;
        flex: 0 1 auto;

        .Reward-o {
          position: relative;
          width: 40px;
          height: 40px;
          outline: transparent solid 1px;
          border-radius: 50%;
          transition: border 0.1s ease-in 0s;
          border-width: 1px;
          border-style: solid;
          border-color: rgb(255, 255, 255);
          border-image: initial;
          background-color: #06d6b7;
        }
      }
    }

    .Reward-Slide {
      .flex-siderbar {
        -webkit-flex: 1 0 0;
        flex: 1 0 0;
      }

      .flex-plus {
        padding-top: 29px;
        width: 2.5em;
        cursor: pointer;
        color: #476641;
        text-align: right;
      }
    }
  }
</style>
