<template slot="content">
  <div>
    <div class="gu-flexCenter user-popover">
      <div style="margin-right:12px;max-width: 180px">
        <div style="font-size:1rem;font-weight: bold">{{user.nick_name}}</div>
        <div style="margin-bottom: 6px">@{{user.user_name}}</div>
        <div style="font-size: 0.8rem;color:rgba(0, 0, 0, 0.54);">{{user.biography}}</div>
      </div>
      <div class="avatar">
        <img :src="user.avatar" class="avatar-image" style="width: 52px;height: 52px;" :alt="user.nick_name">
      </div>
    </div>
    <a @click="handlefollow" class="GuButton GuButton--color GuButton--small" rel="noopener">关注</a>
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
    },
    methods:{
      handlefollow(){

      }
    }
  }
</script>
