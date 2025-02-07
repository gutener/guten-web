<template>
  <div class="main">
    <a-form
            id="formLogin"
            class="user-layout-login"
            ref="formLogin"
            :form="form"
            @submit="handleSubmit"
    >
      <a-tabs
              :activeKey="customActiveKey"
              :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
              @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-form-item>
            <a-input
                    size="large"
                    type="text"
                    placeholder="用户名"
                    v-decorator="[
                'username',
                {rules: [{ required: true, message: '用户名' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
                    size="large"
                    type="password"
                    autocomplete="false"
                    placeholder="密码"
                    v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-row>
              <a-col :span="16">
                <a-input
                        :maxLength="code.len"
                        size="large"
                        auto-complete="off"
                        placeholder="请输入验证码"
                        @keyup.enter.native="handleSubmit"
                        v-decorator="[
                  'code',
                    {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}
                  ]"
                >
                  <a-icon slot="prefix" type="safety-certificate"/>
                </a-input>
              </a-col>
              <a-col :span="8">
                <div class="login-code">
                <span
                        v-if="code.type === 'text'"
                        class="login-code-img"
                        @click="refreshCode">{{ code.value }}</span>
                  <img
                          v-else
                          :src="code.src"
                          class="login-code-img"
                          @click="refreshCode"
                          crossorigin>
                  <!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
                </div>
              </a-col>
            </a-row>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="手机号登录">
          <a-form-item>
            <a-input size="large" type="text" placeholder="手机号"
                     v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input size="large" type="text" placeholder="验证码"
                         v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                      class="getCaptcha"
                      tabindex="-1"
                      :disabled="state.smsSendBtn"
                      @click.stop.prevent="getCaptcha"
                      v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
        <router-link
                :to="{ name: 'recover', params: { user: 'aaa'} }"
                class="forge-password"
                style="float: right;"
        >忘记密码
        </router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
                size="large"
                type="primary"
                htmlType="submit"
                class="login-button"
                :loading="state.loginBtn"
                :disabled="state.loginBtn"
        >确定
        </a-button>
      </a-form-item>

      <div class="user-login-other">
        <span>其他登录方式</span>
        <a>
          <a-icon class="item-icon" type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="weibo-circle"></a-icon>
        </a>
        <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>
      </div>
    </a-form>

    <two-step-captcha
            v-if="requiredTwoStepCaptcha"
            :visible="stepCaptchaVisible"
            @success="stepCaptchaSuccess"
            @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
  import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
  import {mapActions} from 'vuex'
  import {randomLenNum} from '@/utils/util'
  import {get2step, getSmsCaptcha} from '@/api/login'

  export default {
    components: {
      TwoStepCaptcha
    },
    data() {
      return {
        customActiveKey: 'tab1',
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        requiredTwoStepCaptcha: false,
        stepCaptchaVisible: false,
        form: this.$form.createForm(this),
        state: {
          time: 60,
          loginBtn: false,
          // login type: 0 email, 1 username, 2 telephone
          loginType: 0,
          smsSendBtn: false
        },
        code: {
          src: '/code',
          value: '',
          len: 4,
          type: 'image'
        }
      }
    },
    created() {
      this.refreshCode()
      get2step({})
          .then(res => {
            this.requiredTwoStepCaptcha = res.result.stepCode
          })
          .catch(() => {
            this.requiredTwoStepCaptcha = false
          })
      // this.requiredTwoStepCaptcha = true
    },
    methods: {
      ...mapActions(['Login', 'Logout']),
      // handler
      handleUsernameOrEmail(rule, value, callback) {
        const {state} = this
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
        if (regex.test(value)) {
          state.loginType = 0
        } else {
          state.loginType = 1
        }
        callback()
      },
      handleTabClick(key) {
        this.customActiveKey = key
        // this.form.resetFields()
      },
      handleSubmit(e) {
        e.preventDefault()
        const {
          form: {validateFields},
          state,
          customActiveKey,
          Login
        } = this

        state.loginBtn = true

        const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password', 'code'] : ['mobile', 'captcha']

        validateFields(validateFieldsKey, {force: true}, (err, values) => {
          if (!err) {
            const loginParams = {...values}
            delete loginParams.username
            loginParams[!state.loginType ? 'email' : 'username'] = values.username
            loginParams.password = values.password
            loginParams.randomStr = this.form.randomStr
            Login(loginParams)
                .then((res) => this.loginSuccess(res))
                .catch(err => this.requestFailed(err))
                .finally(() => {
                  state.loginBtn = false
                })
          } else {
            setTimeout(() => {
              state.loginBtn = false
            }, 600)
          }
        })
      },
      getCaptcha(e) {
        e.preventDefault()
        const {form: {validateFields}, state} = this

        validateFields(['mobile'], {force: true}, (err, values) => {
          if (!err) {
            state.smsSendBtn = true

            const interval = window.setInterval(() => {
              if (state.time-- <= 0) {
                state.time = 60
                state.smsSendBtn = false
                window.clearInterval(interval)
              }
            }, 1000)

            const hide = this.$message.loading('验证码发送中..', 0)
            getSmsCaptcha({mobile: values.mobile}).then(res => {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            }).catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
          }
        })
      },
      stepCaptchaSuccess() {
        this.loginSuccess()
      },
      stepCaptchaCancel() {
        this.Logout().then(() => {
          this.loginBtn = false
          this.stepCaptchaVisible = false
        })
      },
      loginSuccess(res) {
        this.$router.push({path: '/'})
      },
      requestFailed(err) {
        console.error(err)
        this.$notification['error']({
          message: '错误',
          description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
          duration: 4
        })
      },
      refreshCode() {
        this.form.code = ''
        this.form.randomStr = randomLenNum(this.code.len, true)
        this.code.type === 'text'
            ? (this.code.value = randomLenNum(this.code.len))
            : (this.code.src = `${this.codeUrl}?randomStr=${this.form.randomStr}`)
      }
    }
  }
</script>

<style lang="less" scoped>
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @gu-main-color;
        }
      }

      .register {
        float: right;
      }
    }
  }
</style>
