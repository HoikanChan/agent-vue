<template>
   <div class="register-container">
    <span style="position:absolute;top:18px;left:18px">
      <x-icon type="ios-close-empty" size="30"></x-icon>
    </span>
      <x-header :left-options="{backText: ''}" style="border-bottom: 1px solid #ccc ;">注册</x-header>
    <group style="padding:.2rem">
      <x-input label-width="1rem" title="手机号码" placeholder="请输入手机号码" :required="true" ref="mobile" v-model="form.mobile" is-type="china-mobile">
      </x-input>
      <x-input label-width="1rem" title="验证码"  type="text" placeholder="请输入验证码" :required="true" ref="code" v-model="form.code">
        <x-button slot="right" type="primary" mini @click.native="sendCode">{{ countDown || '获取验证码'}}</x-button>
      </x-input>
       <x-input label-width="1rem" title="用户名" type="text" placeholder="请输入2-5个汉字" :required="true" ref="cnName" v-model="form.cnName" :is-type="cnNameValidator">
      </x-input>
      <x-input label-width="1rem" title="密码" type="password" placeholder="请输入6-16个字符的密码" :required="true" :min="6" :max="16" ref="psw" v-model="form.password">
      </x-input>
      <x-input label-width="1rem" title="确定密码" type="password" placeholder="请输入密码" :required="true" v-model="form.checkPassword" :equal-with="form.password">
      </x-input>
      <x-input label-width="1rem" title="注册等级" type="text" placeholder="VIP顾客" :required="true" ref="psw" v-model="form.psw">
      </x-input>
      <x-input label-width="1rem" title="推荐人" type="text" placeholder="请输入推荐人的名字" :required="true" ref="psw" v-model="form.psw" readOnly>
      </x-input>
      <x-input label-width="1rem" title="审核凭证" type="text" placeholder="请上传支付凭证图片" :required="true" ref="psw" v-model="form.psw">
      </x-input>
    </group>
      <x-button type="primary" action-type="submit"@click.native="register()" style="margin-top:.5rem;width: 90.4%;">提交审核</x-button>
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
  data() {
    return {
      form: {},
      countDown: '',
      cnNameValidator: function(value) {
        return {
          valid: value.match(/^[\u4e00-\u9fa5]{2,4}$/),
          msg: '请输入2-5个汉字'
        }
      }
    }
  },
  methods: {
    sendCode() {
      if (typeof this.countDown === 'number') return
      this.countDown = 60
      let interval = setInterval(() => {
        this.countDown--
        if (this.countDown === 0) {
          this.countDown = ''
          clearInterval(interval)
        }
      }, 1000)
    },
    register() {
      if (this.$refs.mobile.valid && this.$refs.psw.valid) {
        console.log('login')
        this.$router.push({name:'registered'})
      }
    }
  }
}
</script>
<style lang="less">
.register-container{
  .weui-cells {
    font-size: 0.15rem !important;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  }
}
</style>


