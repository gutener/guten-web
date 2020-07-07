<template>
  <div class="main-layout padding-default image-card">
    <div v-if="!!imageItem.body" class="main-layout">
      <div class="main-layout">
        {{imageItem.body}}
      </div>
    </div>
    <div class="main-layout min-marginTop min-border-radius">
      <div class="main-layout" style="height: 364px" v-if="images.length!==0">
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
  </div>
</template>
<script>
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
        this.images.forEach(val=>{
          val.style=`background-image: url("${val.src}");`
        })
      },
      sliceItems: function (start, end) {
        return this.images.slice(start, end);
      }
    }
  }
</script>
<style lang="less" scoped>
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