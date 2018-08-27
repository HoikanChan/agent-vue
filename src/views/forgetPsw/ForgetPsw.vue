<template>
  <div class="forget-psw-container">
    <x-header :left-options="{backText: ''}">忘记密码</x-header>
    <div class="content">
      <group>
        <x-input title="message" placeholder="请输入手机号码" :required="true" ref="mobile" v-model="form.mobile" is-type="china-mobile">
          <x-icon slot="label" type="android-phone-portrait" style="padding-right:10px;display:block;"></x-icon>
        </x-input>
        <x-input type="text" placeholder="请输入验证码" :required="true" ref="code" v-model="form.code">
          <x-icon slot="label" type="ios-locked-outline" style="display:block;padding-right:10px;"></x-icon>
          <x-button slot="right" type="primary" mini @click.native="sendCode">{{ countDown || '获取验证码'}}</x-button>
        </x-input>
        <x-input title="message" type="password" placeholder="设置新密码" :required="true" ref="psw" v-model="form.password">
          <x-icon slot="label" type="ios-locked-outline" style="padding-right:10px;display:block;"></x-icon>
        </x-input>
        <x-input title="message" type="password" placeholder="确认密码" :required="true" v-model="form.checkPassword" :equal-with="form.password">
          <x-icon slot="label" type="ios-locked-outline" style="padding-right:10px;display:block;"></x-icon>
        </x-input>
        <x-button style="margin-top:46px;" type="primary" action-type="submit" class="round-btn" @click.native="modifyPsw()">提交修改</x-button>
      </group>
    </div>
  </div>
</template>
<script>
import { XButton, XInput, Group, XHeader } from 'vux'
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
        code: '',
        password: '',
        checkPassword: ''
      },
      countDown: ''
    }
  },
  methods: {
    modifyPsw() {
      if (
        this.$refs.mobile.valid &&
        this.$refs.psw.valid &&
        this.$refs.code.valid
      ) {
        console.log('login')
      }
    },
    sendCode() {
      this.countDown = 10
      let interval = setInterval(() => {
        this.countDown--
        if (this.countDown === 0) {
          this.countDown = ''
          clearInterval(interval)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less">
body {
  background: #fff;
}
input {
  font-size: 14px;
}
.forget-psw-container {
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
