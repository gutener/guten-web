<template>
  <a-skeleton class="user-container" :loading="loading" active>
    <section class="gu-flex user-container">
      <div class="user_mainColum">
        <div style="margin-bottom: 5rem;">
          <div class="hero-avatar">
            <div class="user_avatar_body">
              <img :alt="user.nick_name" class=""
                   :src="user.avatar" width="128" height="128">
            </div>
          </div>
          <div class="gu-flex user_nickName">
            <h1>{{user.nick_name}}</h1>
            <div v-if="isMyPage" class="user_edit">
              <a :href="user.editUrl" class="GuButton GuButton--light GuButton--small" rel="noopener">编辑</a>
            </div>
            <div v-if="!isMyPage" class="user_edit">
              <a @click="handlefollow" class="GuButton GuButton--color GuButton--small" rel="noopener">{{followText}}</a>
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
            <div class="gu-flex user_follow margintop24">
              <a>{{user.following_count}} 关注</a>
              <a v-if="user.followers_count" style="margin-left: 24px;">{{user.followers_count}} 粉丝</a>
              <a style="margin-left: 24px;">{{user.income_total}}<i>₲</i> 总收益</a>
              <a style="margin-left: 24px;">{{user.seeded_count}} 被支持</a>
              <a style="margin-left: 24px;">{{user.seeding_count}} 支持</a>
            </div>
          </div>
        </div>
        <tabs class="user_mainColum-tabs">
          <tab title="动态">
            <div>asdfdsf</div>
          </tab>
          <tab title="回复">
            ddddfffdf
          </tab>
        </tabs>
      </div>
    </section>
  </a-skeleton>
</template>
<script>
  import {follow, getUser, unfollow} from '@/api/biz'
  import {mapGetters} from 'vuex'
  import moment from "moment"
  import {Tab, Tabs} from '@/components/Tabs'

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.userName = to.params.username
        if (vm.userName === vm.userInfo().user_name) {
          vm.isMyPage = true
        }
        vm.getUserInfo(to.params.username)
      })
    },
    data() {
      return {
        loading: true,
        userName: '',
        isMyPage: false,
        user: {},
        isFollow:0,
        followText:''
      }
    },
    components: {
      Tabs,
      Tab,
    },
    methods: {
      ...mapGetters(['userInfo']),
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
              this.isFollow = this.user.is_followed
              this.changeFollowText()
              this.loading = false
            })
            .catch(error => {
              console.error(error)
            })
      },
      changeFollowText(){
        if(this.user.is_followed===0){
          this.followText="关注"
        }else if(this.user.is_followed===1){
          this.followText="正在关注"
        }else if(this.user.is_followed===2){
          this.followText="相互关注"
        }
      },
      handlefollow() {
        const userid = this.user.user_id
        if(this.user.is_followed===0){
          follow(userid)
              .then(response => {
                this.user.is_followed=this.isFollow
                this.changeFollowText()
              })
              .catch(error => {
                console.error(error)
              })
        }else{
          unfollow(userid)
              .then(response => {
                this.user.is_followed=0
                this.changeFollowText()
              })
              .catch(error => {
                console.error(error)
              })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "./user_homepage";
</style>