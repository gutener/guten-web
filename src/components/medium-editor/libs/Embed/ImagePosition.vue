<template>
  <div class="image-handler" v-if="handler.isShow" v-bind:style="handler.position">
    <div class="image-hander-menu">
      <button class="btn-toggle" v-on:click="imageSizing('is-layoutOutsetLeft')">
        <svg-icon iconClass="editor-left-arrow-active" style="font-size: 20px;display: block" v-if="handler.currentSize === 'is-layoutOutsetLeft'"></svg-icon>
        <svg-icon iconClass="editor-left-arrow" style="font-size: 20px;display: block" v-if="handler.currentSize !== 'is-layoutOutsetLeft'"></svg-icon>
      </button>
      <button class="btn-toggle" v-on:click="imageSizing('is-expand')">
        <svg-icon iconClass="editor-middle-arrow-active" style="font-size: 20px;display: block" v-if="handler.currentSize === 'is-expand'"></svg-icon>
        <svg-icon iconClass="editor-middle-arrow" style="font-size: 20px;display: block" v-if="handler.currentSize !== 'is-expand'"></svg-icon>
      </button>
      <button class="btn-toggle" v-on:click="imageSizing('is-layoutOutsetRight')">
        <svg-icon iconClass="editor-right-arrow-active" style="font-size: 20px;display: block" v-if="handler.currentSize === 'is-layoutOutsetRight'"></svg-icon>
        <svg-icon iconClass="editor-right-arrow" style="font-size: 20px;display: block" v-if="handler.currentSize !== 'is-layoutOutsetRight'"></svg-icon>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'handler'
    ],
    methods: {
      imageSizing(sizing) {
        console.log(sizing)
        this.handler.currentSize = sizing
        this.handler.currentLine.className = 'editor-image ' + sizing

        this.$emit('onPositionChange')
      }
    }
  }
</script>

