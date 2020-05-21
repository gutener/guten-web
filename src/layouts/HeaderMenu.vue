<template>
  <SlideMenu>
    <a href="/rexwong626">
      <span>wyp</span>
    </a>
    <a href="/channels">
      <span># 频道</span>
    </a>
    <a href="/settings">
      <span>设置</span>
    </a>
    <a href="/channels">
      <span>帮助</span>
    </a>
  </SlideMenu>
</template>

<script>
  import SlideMenu from '@/components/g-menu/SlideMenu'

  export default {
    name: 'silder-menu',
    data() {
      return {}
    },
    components: {
      SlideMenu
    },
    methods: {
      changeMenu(menu) {
        this.currentMenu = menu.replace(/ +/g, '').toLowerCase();
        return this.currentMenu;
      },
      changeSide(side) {
        this.side = side;
      }
    }
  }
</script>
<style lang="less">
  .AppHeader-menu {
    font-size: 1em;
    max-width: 1200px;
    margin: 2em auto 3em;
    padding: 0 10em;

    a {
      display: inline-block;
      width: 15em;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 800;
      border-top-left-radius: 20px 50px;
      border-top-right-radius: 20px 50px;
      border-bottom-right-radius: 20px 50px;
      border-bottom-left-radius: 20px 50px;
      cursor: pointer;

      &.currentDemo {
        background: #c94e50;
        color: #fffce1;
      }
    }
  }
</style>