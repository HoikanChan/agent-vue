<template>
  <div class="forget-psw-container">
    <x-header :left-options="{backText: ''}" style="border-bottom: 1px solid #ccc ;">
      <span>忘记密码</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
      </x-header>

    <div class="content">
      <group>
        <x-input title="message" placeholder="请输入手机号码" :required="true" ref="mobile" v-model="form.mobile" is-type="china-mobile">
          <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/phone.png" />
        </x-input>
        <x-input type="text" placeholder="请输入验证码" :required="true" ref="code" v-model="form.SMSCode">
         <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/password.png" />
          <x-button slot="right" type="primary" mini @click.native="sendCode">{{ countDown || '获取验证码'}}</x-button>
        </x-input>
        <x-input title="message" type="password" placeholder="设置新密码" :required="true" ref="psw" v-model="form.password">
          <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/password.png" />
        </x-input>
        <x-input title="message" type="password" placeholder="确认密码" :required="true" v-model="form.confirmPassword" ref="confirmPassword" :equal-with="form.password">
          <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/password.png" />
        </x-input>
        <x-button style="margin-top:46px;" type="primary" action-type="submit" class="round-btn" @click.native="modifyPsw()">提交修改</x-button>
      </group>
    </div>
  </div>
</template>
<script>
import { XButton, XInput, Group, XHeader } from 'vux'
import AuthService from 'services/AuthenticationService'

export default {
  name: 'Login',
  components: {
    XButton,
    XInput,
    Group,
    XHeader
  },
  data: function() {
    return {
      form: {
        mobile: '',
        SMSCode: '',
        password: '',
        confirmPassword: ''
      },
      countDown: ''
    }
  },
  methods: {
    async modifyPsw() {
      if (
        this.$refs.mobile.valid &&
        this.$refs.psw.valid &&
        this.$refs.confirmPassword.valid &&
        this.$refs.code.valid
      ) {
        const result = await AuthService.recoverPsw(this.form)

        if (result.errno) {
          this.$vux.toast.show({
            width: '10em',
            type: 'warn',
            text: result.errmsg
          })
        } else {
          this.$store.dispatch('setUser', result.data)
          this.$router.push({ name: 'recoveredPassword' })
        }
      }
    },
    sendCode() {
      if (this.$refs.mobile.valid) {
        if (typeof this.countDown === 'number') return
        this.countDown = 60
        AuthService.sendRecoverSMSCode(this.form.mobile)
        let interval = setInterval(() => {
          this.countDown--
          if (this.countDown === 0) {
            this.countDown = ''
            clearInterval(interval)
          }
        }, 1000)
      } else {
        this.$vux.toast.show({
          width: '15em',
          type: 'warn',
          text: '请先输入手机号码'
        })
      }
    }
  }
}
</script>

<style lang="less">
input {
  font-size: 14px;
}
.forget-psw-container {
  height: 100vh;
  background: #fff;
  .content {
    padding: 48px 0;
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
    .weui-cell {
      border-bottom: 2px solid @border-color;
      padding: 16px;
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
  }
}
</style>
