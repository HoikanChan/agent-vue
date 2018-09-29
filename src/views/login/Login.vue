<template>
  <div class="login-container">

    <!-- <span style="position:absolute;top:18px;left:18px">
    </span> -->
    
    <group>
      <div class="title">
        <img src="../../assets/images/logo.png" />
        <div>
          <h2>登录</h2>
          <a @click="$router.push({name:'register' })">去注册</a>
        </div>
       
        </div>
      <x-input title="message" placeholder="请输入手机号码" :required="true" ref="mobile" v-model="loginForm.mobile" is-type="china-mobile">
        <!-- <x-icon slot="label" type="android-phone-portrait" style="padding-right:10px;display:block;"></x-icon> -->
        <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/phone.png" />
      </x-input>
      <x-input title="message" type="password" placeholder="请输入密码" :required="true" ref="password" v-model="loginForm.password">
        <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/password.png" />
      </x-input>
      <div class="forgot-password">
        <check-icon :value.sync="isKeepPsw">
          <span>记住密码</span>
        </check-icon>
        <a style="margin-left:10%;" @click="$router.push({name:'forgetPassword' })">忘记密码？</a>
        
      </div>
      <x-button type="primary" action-type="submit" class="round-btn" @click.native="login()">登录</x-button>
    </group>
  </div>
</template>
<script>
import AuthService from 'services/AuthenticationService'
import { setCookie, getCookie, delCookie } from '../../util/cookie'

import { XButton, CheckIcon, XInput, Group } from 'vux'
export default {
  name: 'Login',
  components: {
    XButton,
    CheckIcon,
    XInput,
    Group
  },
  data: function() {
    return {
      isKeepPsw: false,
      loginForm: {
        mobile: '',
        password: ''
      }
    }
  },
  mounted() {
    this.loginForm.mobile = getCookie('mobile') || ''
    this.loginForm.password = getCookie('password') || ''
  },
  methods: {
    close() {
      if (this.$store.getters.getUser) {
        this.$router.push({ name: 'home' })
      } else {
        this.$vux.toast.show({
          width: '10em',
          type: 'warn',
          text: '请登录'
        })
      }
    },
    async login() {
      if (this.$refs.mobile.valid && this.$refs.password.valid) {
        const result = await AuthService.login(this.loginForm)

        if (result.code === 500) {
          this.$vux.toast.show({
            width: '15em',
            type: 'warn',
            text: result.msg
          })
          return
        }

        if (result.errno) {
          this.$vux.toast.show({
            width: '10em',
            type: 'warn',
            text: result.errmsg
          })
        } else {
          if (
            this.$store.getters.getUser &&
            this.$store.getters.getUser.id !== result.data.id
          ) {
            this.$store.dispatch('setBill', '')
            this.$store.commit('setAddress', '')
            this.$store.dispatch('setNewAddress', '')
          }
          this.$store.dispatch('setUser', result.data)
          this.$router.push({ name: 'home' })
          if (this.isKeepPsw) {
            setCookie('mobile', this.loginForm.mobile, 7)
            setCookie('password', this.loginForm.password, 7)
          } else {
            delCookie('mobile')
            delCookie('password')
          }
        }
      }
    }
  }
}
</script>

<style lang="less">
.weui-input {
  font-size: 0.14rem !important;
  color: #ccc !important;
}
.weui-cell {
  padding: 15px !important;
}
.vux-check-icon > span {
  color: #5b50d3 !important;
}
.login-container {
  height: 100vh;
  background: url('../../assets/images/login_bg.png') no-repeat center/cover;
  .weui-icon-success,
  .weui-icon-success:before {
    color: #655ad8 !important;
  }
  .vux-x-icon {
    fill: #333;
  }
  .weui-cells {
    padding: 0 40px;
    border-radius: 0.08rem;
    &:before {
      border: none;
    }
    &:after {
      border: none;
    }
  }
  button {
    margin-top: 0.48rem;
    height: 0.35rem;
    line-height: 0.35rem;
  }
  .weui-cell {
    border-bottom: 2px solid @border-color;
    &:before {
      border: none !important;
    }
  }
  .title {
    text-align: center;
    img {
      display: block;
      width: 1.02rem;
      height: auto;
      margin: 0.4rem auto;
    }
    div {
      display: flex;
      justify-content: space-evenly;
      margin: 0.12rem 0 0.35rem 0;
      h2 {
        display: inline;
        // margin: 24px auto;
        // padding: 0 8px;
        color: @primary-color;
        text-align: center;
        font-size: 19px;
        border-bottom: 0.02rem solid #5b50d3;
      }
      a {
        color: #666;
        font-size: 0.19rem;
      }
    }
  }
  .forgot-password {
    text-align: right;
    display: flex;
    align-items: center;
    padding-top: 0.2rem;
    justify-content: space-between;
    a {
      color: @primary-color;
      font-size: 14px;
    }
  }
  > div {
    width: 84.4%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 4.4rem;
    background: #fff;
    border-radius: 0.08rem;
  }
}
</style>
