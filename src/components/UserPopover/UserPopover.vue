<template slot="content">
  <div class="main-layout">
    <div class="main-layout flex-row justify-between">
      <div class="main-layout avatar">
        <img :src="user.avatar" :alt="user.nick_name" class="avatar-image" style="width: 62px; height: 62px;">
      </div>
      <button class="main-layout">
        关注
      </button>
    </div>
    <div class="main-layout">
      {{user.nick_name}}
    </div>
    <div class="main-layout">
      @{{user.user_name}}
    </div>
    <div class="main-layout">
      {{user.biography}}
    </div>
    <div class="main-layout flex-row justify-between">
      <div class="main-layout">
        <div>
          2 正在关注
        </div>
      </div>
      <div class="main-layout">
        <div>
          2 位关注者
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      user: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      handlefollow() {

      }
    }
  }
</script>