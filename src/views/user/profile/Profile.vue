<template>
  <a-skeleton class="" :loading="loading" active>
    <div class="main-layout flex-row justify-between padding-default marginBottom10">
      <div class="main-layout">
        <div class="main-layout user-body">
          <div class="main-layout flex-row user-name">
            <span>{{user.nick_name}}</span>
          </div>
          <div class="main-layout flex-row gu-flex-shrink">
            <span class="font-light">@{{user.user_name}}</span>
          </div>
        </div>
        <div v-if="user.biography" class="main-layout marginBottom10" style="width: 420px;">
          <div class="main-layout">
            <span dir="auto" class="main-layout">{{user.biography}}</span>
          </div>
        </div>
        <div class="main-layout flex-row  marginBottom10">
          <div class="flex-row marginRight10">
            <svg-icon iconClass="location" class="min-marginRight"
                      style="font-size:20px;color:rgb(101, 119, 134)"></svg-icon>
            <span class="font-light">{{user.location}}</span>
          </div>
          <div class="flex-row">
            <svg-icon iconClass="date" class="min-marginRight"
                      style="font-size:18px;color:rgb(101, 119, 134)"></svg-icon>
            <span class="font-light">{{user.create_time}}加入</span>
          </div>
        </div>
        <div class="main-layout flex-row">
          <a class="font-light flex-row marginRight10" v-if="!!user.following_count">
            <span class="font-bold">{{user.following_count}}</span> 正在关注
          </a>
          <a class="font-light flex-row marginRight10" v-if="!!user.followers_count">
            <span class="font-bold">{{user.followers_count}}</span> 个关注者
          </a>
          <router-link class="font-light flex-row marginRight10" v-if="!!user.seeding_count" :to="urlSeeding">
            <span class="font-bold">{{user.seeding_count}}</span> 次SEEDING
          </router-link>
          <router-link class="font-light flex-row" v-if="!!user.seeded_count" :to="urlSeeded">
            <span class="font-bold">{{user.seeded_count}}</span> 次SEEDED
          </router-link>
        </div>
      </div>
      <div class="main-layout">
        <div class="main-layout avatar">
          <img :src="user.avatar"
               :alt="user.nick_name"
               class="avatar-image"
               style="width: 132px; height: 132px;">
        </div>
      </div>
    </div>
  </a-skeleton>
</template>
<script>
  import {domTitle, setDocumentTitle} from '@/utils/domUtil'
  import {follow, getUser, unfollow} from '@/api/biz'
  import moment from "moment";
  import {mapGetters} from "vuex";

  export default {
    props: {
      userName: {
        type: String
      }
    },
    data() {
      return {
        loading: true,
        isMyPage: false,
        user: {},
        isFollow: 0,
        followText: '',
        userId: '',
        urlSeeding:'',
        urlSeeded:''
      }
    },
    created() {
      this.render()
      this.isOwner()
    },
    methods: {
      ...mapGetters(['userInfo']),
      render() {
        this.urlSeeding = `/u/${this.userName}/seeding`
        this.urlSeeded = `/u/${this.userName}/seeded`
        this.getUserInfo()
      },
      getUserInfo() {
        getUser(this.userName)
            .then(response => {
              this.userId = response.user_id
              this.user = response
              setDocumentTitle(`${this.user.nick_name}(@${this.user.user_name}) / ${domTitle}`)
              if (!this.user.nick_name) {
                this.user.nick_name = 'GUTENer'
              }
              if (!this.user.location) {
                this.user.location = '地球'
              }
              this.user.editUrl = `/u/${this.user.user_name}/edit`
              const currentTime = moment()
              let creatTime = moment(this.user.create_time)
              if (currentTime.diff(creatTime, 'days') > 7) {
                if (currentTime.format('YYYY') === creatTime.format('YYYY')) {
                  this.user.create_time = creatTime.format("MMMDo")
                } else {
                  this.user.create_time = creatTime.format("LL")
                }
              } else {
                this.user.create_time = creatTime.fromNow()
              }
              this.isFollow = this.user.is_followed
              this.changeFollowText()
              this.loading = false
            })
            .catch(error => {
              console.error(error)
            })
      },
      isOwner() {
        if (this.userName === this.userInfo().user_name) {
          this.isMyPage = true
        }
      },
      changeFollowText() {
        if (this.user.is_followed === 0) {
          this.followText = "关注"
        } else if (this.user.is_followed === 1) {
          this.followText = "正在关注"
        } else if (this.user.is_followed === 2) {
          this.followText = "相互关注"
        }
      },
      handlefollow() {
        const userid = this.user.user_id
        if (this.user.is_followed === 0) {
          follow(userid)
              .then(response => {
                this.user.is_followed = this.isFollow
                this.changeFollowText()
              })
              .catch(error => {
                console.error(error)
              })
        } else {
          unfollow(userid)
              .then(response => {
                this.user.is_followed = 0
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
  .hero-avatar {
    float: right;
    margin-top: 10px;
    margin-left: 40px;
    margin-bottom: 10px;

    .user_avatar_body {
      position: relative;
      height: 128px;
      width: 128px;

      img {
        border-radius: 50%;
      }
    }
  }

  .user-body {
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .user-name {
    font-weight: 800;
    font-size: 19px;
    color: rgb(20, 23, 26);
  }
</style>