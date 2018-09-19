<template>
  <div class="updatephone">
    <x-header :left-options="{backText: ''}" style="border-bottom:none;">
      <span>修改手机号</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
    </x-header>
    <p style="text-align:center;padding:.47rem 0;font-size: .15rem;">当前手机号：
      <span>{{$store.getters.getUser.mobile}}</span>
    </p>
    <div class="update">
      <group>
        <x-input title="message" placeholder="请输入新手机号码" :required="true" ref="newMobile" v-model="form.newMobile" is-type="china-mobile">
          <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/phone.png" />
          <x-button slot="right" type="primary" mini @click.native="sendCode">{{ countDown || '获取验证码'}}</x-button>
        </x-input>
        <x-input type="text" placeholder="请输入旧手机验证码" :required="true" ref="SMSCodeOfOldMobile" v-model="form.SMSCodeOfOldMobile">
          <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/verify.png" />
        </x-input>
        <x-input type="text" placeholder="请输入新手机验证码" :required="true" ref="SMSCodeOfNewMobile" v-model="form.SMSCodeOfNewMobile">
          <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/verify.png" />
        </x-input>
        <x-button style="margin-top:60px;" type="primary" action-type="submit" class="round-btn" @click.native="modifyPhone()">验证并绑定</x-button>
      </group>
    </div>
  </div>
</template>
<script>
import { XButton, XInput, Group, XHeader } from 'vux'
import AuthService from 'services/AuthenticationService'
import { setTimeout } from 'timers'

export default {
  data() {
    return {
      form: {},
      countDown: '',
      newCodecountDown: ''
    }
  },
  components: {
    XHeader,
    XButton,
    Group,
    XInput
  },
  methods: {
    async sendCode() {
      if (this.$refs.newMobile.valid) {
        if (typeof this.countDown === 'number') return
        this.countDown = 60
        const result = await AuthService.changeMobileSMSCode(
          this.form.newMobile
        )
        if (result.errno) {
          this.countDown = ''
          this.$vux.toast.show({
            width: '15em',
            type: 'warn',
            text: result.errmsg
          })
          return
        }
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
    },
    async modifyPhone() {
      if (
        this.$refs.newMobile.valid &&
        this.$refs.SMSCodeOfOldMobile.valid &&
        this.$refs.SMSCodeOfNewMobile.valid
      ) {
        this.$vux.loading.show({
          text: '修改手机中..'
        })
        const result = await AuthService.changeMobile(this.form)
        this.$vux.loading.hide()
        if (result.errno === 0) {
          this.$vux.toast.show({
            width: '10em',
            type: 'success',
            text: '修改成功'
          })
          setTimeout(() => {
            this.$router.push({ name: 'login' })
          }, 2000)
        } else {
          this.$vux.toast.show({
            width: '10em',
            type: 'warn',
            text: result.errmsg || result.msg
          })
        }
      } else {
        this.$vux.toast.show({
          width: '10em',
          type: 'warn',
          text: '请完善信息'
        })
      }
    }
  }
}
</script>
<style lang='less'>
.updatephone {
  height: 100vh;
  background: #fff;
  .update {
    div {
      .weui-cells {
        padding: 0 40px;
        &:before {
          border: none !important;
        }
        &:after {
          border: none !important;
        }
        .weui-cell {
          border-bottom: 2px solid #eee;
          &:before {
            border-top: none !important;
          }
        }
      }
    }
  }
}
</style>
