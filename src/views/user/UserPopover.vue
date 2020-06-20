<template slot="content">
  <div class="gu-flexCenter user-popover">
    <div style="margin-right:12px;max-width: 160px">
      <div style="margin-bottom: 6px;font-size:1rem;font-weight: bold">{{user.user_name}}</div>
      <div style="font-size: 0.8rem;color:rgba(0, 0, 0, 0.54);">{{user.biography}}</div>
    </div>
    <div class="avatar">
      <img :src="user.avatar" class="avatar-image" :alt="user.nick_name">
    </div>
    <div style="border-bottom: 1px #eee"></div>
  </div>
</template>

<script>
  export default {
    props:{
      user: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>