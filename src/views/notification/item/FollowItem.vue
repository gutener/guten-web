<template>
  <div class="follow">
    <article class="main-layout justify-center flex-grow1">
      <div class="main-layout flex-row">
        <div class="main-layout user-section" v-for="user in users">
          <a-popover trigger="hover" :destroyTooltipOnHide=true>
            <a :href="user.url" class="avatar">
              <img :src="user.avatar" class="avatar-image" style="width: 32px;height: 32px;"
                   :alt="user.nick_name">
            </a>
            <UserPopover :user="user" slot="content"/>
          </a-popover>

        </div>
      </div>
      <div class="user-message">
        <span style="font-weight: 800">{{firstUser.nick_name}}</span> <span> 等{{userCount}}人关注你</span>
      </div>
    </article>
  </div>
</template>
<script>
  import UserPopover from "@/views/user/UserPopover"
  export default {
    name: "seed-card",
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        users: [],
        firstUser:{},
        userCount:0
      }
    },
    components: {
      UserPopover
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.users = this.data.target
        this.users.forEach(user=>{
          user.url=`/u/${user.user_name}`
        })
        const fuser = this.users[0]
        this.firstUser={
          nick_name:fuser.nick_name
        }
        this.userCount=this.users.length
      }
    }
  }
</script>
<style lang="less" scoped>
  /*@import url('../../../components/global.less');*/

  .user-section {
    margin-right: 8px;
  }
  .user-message{
    margin-top:8px;
  }
</style>