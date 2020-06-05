<template>
  <a-skeleton class="user-container" :loading="loading" active>
    <section class="gu-flex user-container">
      <div class="user_mainColum">
        <div class="user_avatar">
          <div class="user_avatar_body">
            <img alt="ypwang" class=""
                 src="https://miro.medium.com/fit/c/256/256/0*tH7Qnw5ZErk6R2ON." width="128" height="128">
          </div>
        </div>
        <div class="gu-flex user_nickName">
          <h1>{{user.nick_name}}</h1>
          <div class="user_edit">
            <a :href="user.editUrl" class="GuButton GuButton--light GuButton--small" rel="noopener">Edit profile</a>
          </div>
        </div>
        <div style="margin-top:24px">
          <div v-if="user.biography" class="gu-flex margintop12">
            <span>{{user.biography}}</span>
          </div>
          <div class="gu-flex user_location margintop12">
            <svg-icon iconClass="location" style="font-size: 20px;margin-left:-4px"></svg-icon>
            <span style="margin-left: 4px;">{{user.location}}</span>
          </div>
        </div>
      </div>
    </section>
  </a-skeleton>
</template>
<script>
  import {getUser} from '@/api/biz'
  import moment from "moment";

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getUserInfo(to.params.username)
      })
    },
    data() {
      return {
        loading: true,
        userName: '',
        user: {}
      }
    },
    methods: {
      getUserInfo(id) {
        getUser(id)
            .then(response => {
              this.user = response
              if (!this.user.nick_name) {
                this.user.nick_name = 'GUTENer'
              }
              if (!this.user.location) {
                this.user.location = '地球'
              }
              this.user.editUrl = `/u/${this.user.user_name}/edit`
              this.user.create_time = moment(this.user.create_time).fromNow()
              this.loading = false
            })
            .catch(error => {
              console.error(error)
            })
      },
    }
  }
</script>
<style lang="less" scoped>
  @import "./user_homepage";
</style>