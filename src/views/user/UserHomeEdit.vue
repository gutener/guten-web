<template>
  <section class="gu-flex user-container">
    <div class="user_mainColum">
      <div style="margin-bottom: 5rem;">
        <div class="user_avatar">
          <div class="user_avatar_body">
            <img alt="ypwang" class=""
                 src="" width="128" height="128">
          </div>
        </div>
        <div class="gu-flex user_nickName">
          <h1 contenteditable="true"
              data-default-value="Enter your name"
              data-length="7"
              data-max-length="50"
              data-chars-remaining="43">
            <p class=""></p>
          </h1>
        </div>
        <div style="margin-top:24px">
          <div contenteditable="true"
               data-default-value="Enter your name"
               data-length="7"
               data-max-length="50"
               data-chars-remaining="43"
               class="gu-flex margintop12">
            <span class="defaultValue defaultValue--root">Enter a short bio</span>
          </div>
          <div class="gu-flex user_location margintop12">
            <svg-icon iconClass="location" style="font-size: 20px;margin-left:-4px"></svg-icon>
            <span style="margin-left: 4px;">{{user.location}}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.user.username=to.params.username
      })
    },
    data() {
      return {
        user:{}
      }
    },
    methods: {
      submit() {
        console.log(this.user)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "./user_homepage";
</style>