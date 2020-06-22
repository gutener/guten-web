<template>
  <button class="GuButton" style="transform: scale(1, 1);"
          @mouseover="isHovering = true"
          @mouseout="isHovering = false"
          :class="{'GuButton--seed-hover': isHovering,'GuButton--seed': !isHovering}" @click="clickButton">
    <span class="seed">{{reward}}<i>₲</i></span>
    <span class="popover" style="opacity: 0; transform: scale(0);">5</span>
  </button>
</template>

<script>
  export default {
    props: {
      reward: {
        type: Number
      }
    },
    data() {
      return {
        isHovering: false
      }
    },
    methods: {
      clickButton() {
        const popover = this.$el.getElementsByClassName('popover')[0]
        let top = -10
        let opacity = 1
        popover.style = `opacity:${opacity};
                         transform: translate(0px, ${top}px) rotate(0deg) skew(0deg, 0deg) scale(1, 1);`
        this.$emit('seedClick')
      }
    }
  }
</script>
<style lang="less" scoped>
  .GuButton--seed {
    position: relative;
    width: 40px;
    height: 40px;
    outline: transparent solid 1px;
    border-radius: 50%;
    transition: border 0.1s ease-in 0s;
    padding: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
    background: #48c774;

    &:after {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      display: block;
      border-radius: 50%;
      width: 39px;
      height: 39px;
      color: rgb(39, 174, 96);
      fill: rgb(39, 174, 96);
      border-color: rgb(39, 174, 96);
    }
  }

  .GuButton--seed-hover {
    position: relative;
    width: 40px;
    height: 40px;
    outline: transparent solid 1px;
    border-radius: 50%;
    transition: border 0.1s ease-in 0s;
    padding: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
    background: #48c774;

    &:after {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      display: block;
      border-radius: 50%;
      width: 39px;
      height: 39px;
      color: rgb(39, 174, 96);
      fill: rgb(39, 174, 96);
      border-color: rgb(39, 174, 96);
      animation: pulse 2s ease 0s infinite normal none running;
    }
  }

  .GuButton--seed-hover:hover, .GuButton--seed-hover:focus {
    border-width: 1px;
    border-style: solid;
    border-color: rgb(39, 174, 96);
    border-image: initial;
  }

  .seed {
    color: #fafafa;
  }

  .popover {
    color: white;
    backface-visibility: hidden;
    font-size: 0.8rem;
    user-select: none;
    pointer-events: none;
    position: absolute;
    height: 30px;
    width: 30px;
    line-height: 30px;
    top: -30px;
    left: 5px;
    border-radius: 50%;
    background: rgb(39, 174, 96);

  }

  @keyframes pulse {
    0% {
      opacity: 1;
      transform: scale(1, 1);
    }
    50% {
      opacity: 0.3;
      transform: scale(1.2, 1.2);
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
</style>