<template>
    <div class="updatephone">
        <x-header :left-options="{backText: ''}" style="border-bottom:none;">
            <span>修改手机号</span>
            <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
        </x-header>
        <p style="text-align:center;padding:.47rem 0;font-size: .15rem;">当前手机号：<span>1888888888888</span></p>
        <div class="update">
            <group>
                <x-input title="message" placeholder="请输入新手机号码" :required="true" ref="mobile" v-model="form.mobile" is-type="china-mobile">
                    <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/phone.png" />
                </x-input>
                <x-input type="text" placeholder="请输入验证码" :required="true" ref="code" v-model="form.SMSCode">
                    <img slot="label" style="width:.14rem;height:auto;padding-right:10px;display:block;" src="../../assets/images/verify.png" />
                    <x-button slot="right" type="primary" mini @click.native="sendCode">{{ countDown || '获取验证码'}}</x-button>
                </x-input>
                <x-button style="margin-top:60px;" type="primary" action-type="submit" class="round-btn" @click.native="modifyPhone()">验证并绑定</x-button>
            </group>
        </div>
    </div>
</template>
<script>
import { XButton, XInput, Group, XHeader } from 'vux'
export default {
  data() {
    return {
      form: {
        mobile: '',
        SMSCode: ''
      },
      countDown: ''
    }
  },
  components: {
    XHeader,
    XButton,
    Group,
    XInput
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
          .weui-cell:before {
            border-top: none !important;
          }
        }
      }
    }
  }
}
</style>
