<template>
  <div class="login-container">

    <span style="position:absolute;top:18px;left:18px">
    </span>
    <div class="title">
      <h2>登录</h2>
    </div>
    <group>
      <x-input title="message" placeholder="请输入手机号码" :required="true" ref="mobile" v-model="loginForm.mobile" is-type="china-mobile">
        <!-- <x-icon slot="label" type="android-phone-portrait" style="padding-right:10px;display:block;"></x-icon> -->
        <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/phone.png" />
      </x-input>
      <x-input title="message" type="password" placeholder="请输入密码" :required="true" ref="password" v-model="loginForm.password">
        <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/password.png" />
      </x-input>
      <div class="forgot-password">
        <a @click="$router.push({name:'forgetPassword' })">忘记密码？</a>
        <a @click="$router.push({name:'register' })">去注册？</a>
      </div>
      <x-button type="primary" action-type="submit" class="round-btn" @click.native="login()">登录</x-button>
    </group>
  </div>
</template>
<script>
import AuthService from 'services/AuthenticationService'
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
        password: ''
      }
    }
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
          this.$store.dispatch('setUser', result.data)
          this.$router.push({ name: 'home' })
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
.login-container {
  height: 100vh;
  background: #fff;
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
    padding: 60px 0 46px;
    h2 {
      display: inline;
      margin: 24px auto;
      padding: 0 8px;
      color: @primary-color;
      text-align: center;
      font-size: 19px;
    }
  }
  .forgot-password {
    text-align: right;
    padding-top: 16px;
    a {
      color: @primary-color;
      font-size: 14px;
    }
  }
}
</style>
