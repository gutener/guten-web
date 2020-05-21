<template>
  <g-menu v-bind="this.$attrs" @openMenu="openMenu" @closeMenu="closeMenu">
    <slot></slot>
  </g-menu>
</template>

<script>
  import GMenu from './Menu';

  export default {
    name: 'slide-menu',
    components: {
      'g-menu': GMenu
    },
    methods: {
      openMenu() {
        this.$emit('openMenu');
      },
      closeMenu() {
        this.$emit('closeMenu');
      }
    }
  };
</script>


