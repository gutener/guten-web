<template>
  <section class="">
    <Profile :userName="userName"/>
    <!--      <div class="user_mainColum">-->
    <!--        <div style="margin-bottom: 5rem;">-->
    <!--          <div class="hero-avatar">-->
    <!--            <div class="user_avatar_body">-->
    <!--              <img :alt="user.nick_name" class=""-->
    <!--                   :src="user.avatar" width="128" height="128">-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="gu-flex user_nickName">-->
    <!--            <h1>{{user.nick_name}}</h1>-->
    <!--            <div v-if="isMyPage" class="user_edit">-->
    <!--              <a :href="user.editUrl" class="GuButton GuButton&#45;&#45;light GuButton&#45;&#45;small" rel="noopener">编辑</a>-->
    <!--            </div>-->
    <!--            <div v-if="!isMyPage" class="user_edit">-->
    <!--              <a @click="handlefollow" class="GuButton GuButton&#45;&#45;color GuButton&#45;&#45;small" rel="noopener">{{followText}}</a>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div style="margin-top:24px">-->
    <!--            <div v-if="user.biography" class="gu-flex margintop12">-->
    <!--              <span>{{user.biography}}</span>-->
    <!--            </div>-->
    <!--            <div class="gu-flex user_location margintop12">-->
    <!--              <svg-icon iconClass="location" style="font-size: 20px;margin-left:-4px"></svg-icon>-->
    <!--              <span style="margin-left: 4px;">{{user.location}}</span>-->
    <!--            </div>-->
    <!--            <div class="gu-flex user_follow margintop24">-->
    <!--              <a>-->
    <!--                <span style="font-weight: bold;">{{user.following_count}}</span> 正在关注-->
    <!--              </a>-->
    <!--              <a v-if="user.followers_count" style="margin-left: 24px;">-->
    <!--                <span style="font-weight: bold;">{{user.followers_count}}</span> 个关注者-->
    <!--              </a>-->
    <!--              <a style="margin-left: 24px;">-->
    <!--                <span style="font-weight: bold;">{{user.income_total}}<i>₲</i></span> 总收益-->
    <!--              </a>-->
    <!--              <a style="margin-left: 24px;">-->
    <!--                <span style="font-weight: bold;">{{user.seeded_count}}</span> 被支持-->
    <!--              </a>-->
    <!--              <a style="margin-left: 24px;"><span style="font-weight: bold;">{{user.seeding_count}}</span> 次支持过-->
    <!--              </a>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <tabs style="height: 53px;">
      <tab title="全部" :url="currentUrl" active></tab>
      <tab title="回复" url="/notifications"></tab>
      <tab title="媒体" :url="urlMedia"></tab>
    </tabs>
  </section>
</template>
<script>
  import {Tab, Tabs} from '@/components/Tabs/tabs'
  import Profile from "./Profile"

  export default {
    data() {
      return {
        userName: '',
        currentUrl: '',
        urlMedia:''
      }
    },
    components: {
      Tabs,
      Tab,
      Profile
    },
    created() {
      this.render()
    },
    methods: {
      render() {
        this.userName = this.$route.params.username
        this.currentUrl = `/u/${this.userName}`
        this.urlMedia = `/u/${this.userName}/media`
      }
    }
  }
</script>
<style lang="less" scoped>
</style>