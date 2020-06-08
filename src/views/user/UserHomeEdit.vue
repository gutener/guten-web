<template>
  <section class="gu-flex user-container">
    <div class="user_mainColum">
      <div>
        <div class="hero-avatar">
          <div class="hero-avatarPicker">
            <file-upload
                    ref="upload"
                    class="btn-toggle"
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png,image/gif,image/jpeg,image/webp"
                    :post-action="uploadUrl"
                    :size="1024 * 1024 * 10"
                    v-model="files"
                    @input-filter="inputFilter"
                    @input-file="inputFile">
              <div class="user_avatar_body">
                <img alt="ypwang" class=""
                     :src="user.avatar" width="128" height="128">
                <svg-icon iconClass="camera" style="top: 38px;left: 38px;position: absolute;font-size: 52px;"></svg-icon>
              </div>
            </file-upload>
          </div>
        </div>
        <div class="gu-flex user_nickName">
          <h1 style="width:100%">
            <a-textarea placeholder="Enter your name" auto-size v-model="user.nick_name"/>
          </h1>
        </div>
        <div class="gu-flex">
          <a-textarea placeholder="Enter a short bio" :rows="4" v-model="user.biography"/>
        </div>
        <div class="gu-flex user_location margintop12">
          <svg-icon iconClass="location" style="font-size: 20px;margin-left:-4px"></svg-icon>
          <span style="margin-left: 4px;">{{user.location}}</span>
        </div>
        <div class="js-headerButtons" style="margin-top: 24px;">
          <button @click="submit" class="GuButton GuButton--color">
            <span class="js-buttonLabel">Save</span>
          </button>
          <button style="margin-left:12px" class="GuButton GuButton--color">
            <span class="js-buttonLabel">Cancel</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import {mapGetters} from "vuex";
  import VueUploadComponent from 'vue-upload-component';
  import {getUser,updateUser} from '@/api/biz'

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.user.user_name = to.params.username
        if(vm.userInfo().username!==vm.user.user_name){
          vm.$router.back(-1)
        }
        vm.getUserInfo(to.params.username)
      })
    },
    components: {
      'file-upload': VueUploadComponent
    },
    data() {
      return {
        user: {
          nick_name: '',
          avatar:'',
          user_name:''
        },
        files: [],
        uploadUrl:`${process.env.VUE_APP_API_BASE_URL}/story/rich_text/v1/uploadimg`
      }
    },
    watch: {},
    methods: {
      ...mapGetters(['userInfo']),
      inputFilter(newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
            return prevent()
          }
          if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
            return prevent()
          }
        }
      },
      inputFile(newFile, oldFile) {
        if (newFile && !oldFile) {
          this.$refs.upload.active = true
        }
        // Image Upload Successful
        if (newFile && newFile.success) {
          this.user.avatar=newFile.response.url
        }
      },
      submit() {
        const userUpdate={
          user_name:this.user.user_name,
          avatar:this.user.avatar,
          biography:this.user.biography,
          location:this.user.location,
          nick_name:this.user.nick_name
        }
        updateUser(userUpdate)
            .then(response => {
              this.userInfo().nick_name=this.user.nick_name
              this.userInfo().avatar=this.user.avatar
              this.userInfo().biography=this.user.biography
              this.userInfo().location=this.location
            })
            .catch(error => {
              console.error(error)
            })
      },
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
              this.loading = false
            })
            .catch(error => {
              console.error(error)
            })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "./user_homepage";
</style>