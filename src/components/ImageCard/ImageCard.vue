<template>
  <div class="main-layout padding-default paddingTop10 paddingBottom10 image-card flex-row">
    <div class="main-layout align-items-center">
      <button class="GuButton GuButton--seed">
        <span class="seed">{{imageItem.reward}}<span class="main-layout"
                                                     style="margin-top: -6px;"><i>₲</i></span></span>
      </button>
    </div>
    <div class="image-body marginLeft10">
      <div class="main-layout">
        <span class="light-bar">{{imageItem.createTime}}</span>
      </div>
      <div v-if="!!imageItem.body" class="main-layout">
        <div class="main-layout" v-html="imageItem.body"></div>
      </div>
      <div class="main-layout marginTop10 min-border-radius">
        <div class="main-layout" style="height: 324px" v-if="images.length!==0">
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
      <div class="main-layout flex-row justify-between marginTop10">
        <div role="button" class="flex-row">
          <svg-icon iconClass="dislike" style="font-size: 19px;"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from "moment";

  export default {
    name: "image-card",
    props: {
      source: {
        type: Object
      },
    },
    data() {
      return {
        imageItem: {},
        images: []
      }
    },
    created() {
      this.render()
    },
    methods: {
      render() {
        this.imageItem = this.source.target
        this.images = this.imageItem.imageList
        this.images.forEach(val => {
          val.style = `background-image: url("${val.src}");`
        })
        const currentTime = moment()
        let creatTime = moment(this.imageItem.createTime)
        if (currentTime.diff(creatTime, 'days') > 7) {
          if (currentTime.format('YYYY') === creatTime.format('YYYY')) {
            this.imageItem.createTime = creatTime.format("MMMDo")
          } else {
            this.imageItem.createTime = creatTime.format("LL")
          }
        } else {
          this.imageItem.createTime = creatTime.fromNow()
        }
      },
      sliceItems: function (start, end) {
        return this.images.slice(start, end);
      }
    }
  }
</script>
<style lang="less" scoped>
  .image-card {
    border-bottom: 1px solid rgb(230, 236, 240) !important;
  }

  .image-body {
    width: 100%;
  }

  .image-group {
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
  }
</style>