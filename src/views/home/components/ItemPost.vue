<template>
  <div class="main-layout padding-default">
    <div class="main-layout flex-row">
      <div class="main-layout">
        <div class="main-layout avatar">
          <img :src="userInfo().avatar"
               :alt="userInfo().nick_name"
               class="avatar-image"
               style="width: 52px; height: 52px;">
        </div>
      </div>
      <div class="main-layout justify-center flex-grow1">
        <medium-editor
                listHandler="false"
                style="min-height:75px; max-width: 530px"
                :options="options"
                :onChange="onChange">
        </medium-editor>
        <div class="main-layout">
          <div class="main-layout" style="height: 304px" v-if="images.length!==0">
            <div class="main-layout flex-row height100" v-if="images.length<=2">
              <div aria-label="Media" role="group" class="main-layout flex-grow1 image-group" v-for="image in images">
                <div class="image-style" :style="image.style"></div>
                <div aria-label="Remove media" role="button" class=""></div>
                <div aria-label="Edit media" role="button" class=""></div>
              </div>
            </div>
            <div class="main-layout flex-row height100" v-else-if="images.length<4">
              <div aria-label="Media" role="group" class="main-layout flex-grow1 image-group">
                <div class="image-style" :style="images[0].style"></div>
                <div aria-label="Remove media" role="button" class=""></div>
                <div aria-label="Edit media" role="button" class=""></div>
              </div>
              <div class="main-layout flex-column flex-grow1">
                <div aria-label="Media" role="group"
                     class="main-layout flex-grow1 image-group"
                     :class="{'min-marginBottom': (index+1)!==images.length-1}"
                     v-for="(image,index) in sliceItems(1,images.length)">
                  <div class="image-style" :style="image.style"></div>
                  <div aria-label="Remove media" role="button" class=""></div>
                  <div aria-label="Edit media" role="button" class=""></div>
                </div>
              </div>
            </div>
            <div class="main-layout flex-row height100" v-else-if="images.length>=4">
              <div class="main-layout flex-column flex-grow1">
                <div aria-label="Media" role="group"
                     class="main-layout flex-grow1 image-group"
                     :class="{'min-marginTop': index!==0}"
                     v-for="(image,index) in imagesFirstColumn">
                  <div class="image-style" :style="image.style"></div>
                  <div aria-label="Remove media" role="button" class=""></div>
                  <div aria-label="Edit media" role="button" class=""></div>
                </div>
              </div>
              <div class="main-layout flex-column flex-grow1">
                <div aria-label="Media" role="group"
                     class="main-layout flex-grow1 image-group"
                     :class="{'min-marginTop': index!==0}"
                     v-for="(image,index) in imagesSecondColumn">
                  <div class="image-style" :style="image.style"></div>
                  <div aria-label="Remove media" role="button" class=""></div>
                  <div aria-label="Edit media" role="button" class=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-layout justify-between flex-row">
          <div class="main-layout justify-between justify-center flex-row">
            <div class="main-layout flex-row align-items-center">
              <file-upload
                      ref="upload"
                      class="btn-toggle"
                      extensions="gif,jpg,jpeg,png,webp"
                      accept="image/png,image/gif,image/jpeg,image/webp"
                      :post-action=postImageUrl
                      :multiple="true"
                      :size="2048 * 1024 * 10"
                      @input-filter="inputFilter"
                      @input-file="inputFile">
                <div role="button">
                  <svg-icon iconClass="pic-color" class="" style="font-size:27px"></svg-icon>
                </div>
              </file-upload>
              <div>
                <svg-icon iconClass="video-color" class="" style="font-size:31px"></svg-icon>
              </div>
            </div>
          </div>
          <div class="main-layout justify-between justify-center flex-row">
            <div @click="postItem" role="button">发文</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueUploadComponent from 'vue-upload-component'
  import Editor from '@/components/medium-editor/Editor'
  import TweetBox from "@/components/Post/TweetBox"
  import {mapGetters} from "vuex"
  import {postImage,postShotText} from '@/api/biz'

  export default {
    data() {
      return {
        tweet: ``,
        postImageUrl: `${process.env.VUE_APP_API_BASE_URL}/item/1.0/image/upload?type=item`,
        images: [],
        imagesFirstColumn: [],
        imagesSecondColumn: [],
        itemObj: {},
        options: {
          delay: 500,
          placeholder: {
            text: '发布想法，观点，让大家讨论'
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
      }
    },
    methods: {
      ...mapGetters(['userInfo']),
      render() {
      },
      onChange(content) {
        this.tweet = content
      },
      inputFilter(newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
            return prevent()
          }
          if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
            return prevent()
          }
        }
      },
      inputFile(newFile, oldFile) {
        if (newFile && !oldFile) {
          this.$refs.upload.active = true
        }

        // Image Upload Successful
        if (newFile && newFile.success) {
          const image = {
            src: `${newFile.response.url}`,
            style: `background-image: url("${newFile.response.url}");`
          }
          this.images.push(image)
          if (this.images.length % 2 !== 0) {
            this.imagesFirstColumn.push(image)
          } else if (this.images.length % 2 === 0) {
            this.imagesSecondColumn.push(image)
          }
        }
      },
      sliceItems: function (start, end) {
        return this.images.slice(start, end);
      },
      postItem() {
        this.itemObj.body = this.tweet
        let imageList = []
        this.images.forEach(i => {
          const image = {
            src: i.src
          }
          imageList.push(image)
        })
        if(imageList.length!==0){
          this.itemObj.image_list = imageList
          postImage(this.itemObj).then(response => {
            console.log(response)

          }).catch(error => {
            console.error(error)
          })
        }else{
          postShotText(this.itemObj).then(response => {
            console.log(response)
          }).catch(error => {
            console.error(error)
          })
        }
      }
    },
    components: {
      TweetBox,
      "medium-editor": Editor,
      'file-upload': VueUploadComponent
    }
  }
</script>
<style lang="less" scoped>
  .image-group {
    border-radius: 14px;
    margin-right: 10px;
    overflow: hidden;
    transition-duration: 0.1s;
    transition-timing-function: ease-out;
  }

  .image-style {
    background-position: center;
    background-origin: border-box;
    background-size: cover;
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 12px;
  }
</style>