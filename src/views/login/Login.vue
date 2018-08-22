<template>
  <div class="login-container">
    <span style="position:absolute;top:18px;left:18px">
      <x-icon type="ios-close-empty" size="30"></x-icon>
    </span>
    <div class="title">
      <h2>登录</h2>
    </div>
    <group>
      <x-input title="message" placeholder="请输入手机号码" :required="true" ref="mobile" v-model="loginForm.mobile" is-type="china-mobile">
        <x-icon slot="label" type="android-phone-portrait" style="padding-right:10px;display:block;"></x-icon>
      </x-input>
      <x-input title="message" type="password" placeholder="请输入密码" :required="true" ref="psw" v-model="loginForm.psw">
        <x-icon slot="label" type="ios-locked-outline" style="padding-right:10px;display:block;"></x-icon>
      </x-input>
      <div class="forgot-psw">
        <a @click="$router.push({name:'forgetPassword' })">忘记密码？</a>
      </div>
      <x-button type="primary" action-type="submit" class="round-btn" @click.native="login()">登录</x-button>
    </group>
  </div>
</template>
<script>
import { XButton, XInput, Group } from 'vux'
export default {
  name: 'Login',
  components: {
    XButton,
    XInput,
    Group
  },
  data: function() {
    return {
      loginForm: {
        mobile: '',
        psw: ''
      }
    }
  },
  methods: {
    login() {
      if (this.$refs.mobile.valid && this.$refs.psw.valid) {
        console.log('login')
      }
    }
  }
}
</script>

<style lang="less">
.login-container {
  padding-top: 24px;
  .vux-x-icon {
    fill: #333;
  }
  .weui-cells {
    padding: 0 40px;
    &:before {
      border: none;
    }
    &:after {
      border: none;
    }
  }
  button {
    margin-top: 62px;
  }
  .weui-cell {
    border-bottom: 2px solid @border-color;
    &:before {
      border: none;
    }
  }
  .title {
    text-align: center;
    padding: 46px 0;
    h2 {
      display: inline;
      margin: 24px auto;
      padding: 0 8px;
      color: @primary-color;
      text-align: center;
      border-bottom: 3px solid @primary-color;
    }
  }
  .forgot-psw {
    text-align: right;
    color: @primary-color;
    padding-top: 16px;
    a {
      font-size: 14px;
    }
  }
}
</style>
