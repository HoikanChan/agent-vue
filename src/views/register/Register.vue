<template>
  <div class="register-container">
    <span style="position:absolute;top:18px;left:18px">
      <x-icon type="ios-close-empty" size="30"></x-icon>
    </span>
    <x-header :left-options="{backText: ''}" style="border-bottom: 1px solid #ccc ;">注册</x-header>
    <group style="padding:.2rem">
      <x-input label-width="1rem" title="手机号码" placeholder="请输入手机号码" :required="true" ref="mobile" v-model="form.mobile" is-type="china-mobile">
      </x-input>
      <x-input label-width="1rem" title="验证码" type="text" placeholder="请输入验证码" :required="true" ref="code" v-model="form.SMSCode">
        <x-button slot="right" type="primary" mini @click.native="sendCode">{{ countDown || '获取验证码'}}</x-button>
      </x-input>
      <x-input label-width="1rem" title="用户名" type="text" placeholder="请输入2-5个汉字" :required="true" ref="cnName" v-model="form.username" :is-type="cnNameValidator">
      </x-input>
      <x-input label-width="1rem" title="密码" type="password" placeholder="请输入6-16个字符的密码" :required="true" :min="6" :max="16" ref="psw" v-model="form.password">
      </x-input>
      <x-input label-width="1rem" title="确定密码" type="password" placeholder="请输入密码" :required="true" v-model="form.confirmPassword" ref="confirmPassword" :equal-with="form.password">
      </x-input>
      <x-input label-width="1rem" readonly title="注册等级" type="text" placeholder="VIP顾客" :required="true" ref="userLevel" v-model="form.userLevel">
        <x-icon slot="right" type="ios-arrow-forward" mini @click.native="show=true" size="15"></x-icon>
      </x-input>
      <x-input label-width="1rem" title="推荐人" type="text" placeholder="请输入推荐人的名字" :required="true" ref="referralCode" v-model="form.referralCode" readOnly>
      </x-input>
      <x-input label-width="1rem" title="审核凭证" type="text" placeholder="请上传支付凭证图片" :required="true" ref="payOrder" v-model="form.payOrder">
      </x-input>
    </group>
    <x-button type="primary" action-type="submit" @click.native="register()" style="margin-top:.5rem;width: 90.4%;">提交审核</x-button>
    <div v-transfer-dom>
      <popup v-model="show">
        <div class="popup">
          <div class="popup-header">
            <x-button mini plain @click.native="show=flase">取消</x-button>
            <h4>选择注册等级</h4>
            <x-button mini type="primary" @click.native="gradeChoosed">完成</x-button>
          </div>
          <div class="popup-content">
            <span class="type" v-for="grade in gradeList" :key="grade.key" :class="{'picked':grade.id === popupPickedgrade}" @click="pickGrade(grade.id)">
              {{grade.name}}
            </span>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { XButton, XInput, Group, XHeader, Popup, TransferDom } from 'vux'
import AuthService from 'services/AuthenticationService'
export default {
  name: 'Register',
  directives: {
    TransferDom
  },
  components: {
    XButton,
    XInput,
    Group,
    XHeader,
    Popup
  },
  data() {
    return {
      form: {},
      popupPickedgrade: '',
      show: false,
      gradeList: [],
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
      if (this.$refs.mobile.valid) {
        if (typeof this.countDown === 'number') return
        this.countDown = 60
        AuthService.sendCode(this.form.mobile)
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
    async register() {
      if (
        this.$refs.mobile.valid &&
        this.$refs.psw.valid &&
        this.$refs.confirmPassword.valid &&
        this.$refs.cnName.valid &&
        this.$refs.code.valid &&
        this.$refs.userLevel.valid &&
        this.$refs.referralCode.valid
      ) {
        const result = await AuthService.register(this.form)
        if (result.errno) {
          this.$vux.toast.show({
            width: '10em',
            type: 'warn',
            text: result.errmsg
          })
        } else {
          this.$router.push({ name: 'registered' })
        }
      }
    },
    pickGrade(id) {
      this.popupPickedgrade = id
    },
    gradeChoosed() {
      this.show = false
      this.form.userLevelId = this.popupPickedgrade
      this.form.userLevel = this.gradeList.find(
        item => item.id === this.popupPickedgrade
      ).name
    }
  },
  async mounted() {
    const result = (await AuthService.getGradeList()).data
    this.gradeList = result
  }
}
</script>
<style lang="less">
.register-container {
  .weui-cells {
    font-size: 0.15rem !important;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  }
}
</style>
<style lang="less">
.popup {
  .popup-header {
    display: flex;
    padding: 8px 0.15rem;
    background: #fff;
    align-items: center;
    h4 {
      flex: 1 1 auto;
      font-weight: 500;
      font-size: 0.14rem;
      text-align: center;
    }
  }
  .popup-content {
    display: flex;
    flex-wrap: wrap;
    padding: 2%;
    padding-bottom: 1.2rem;
    .type {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 32%;
      margin: 1%;
      padding: 0.15rem 0;
      background: #fff;
      color: #333;
      &:nth-child(3n-2) {
        margin-left: 0;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
      &:hover {
        background: @primary-color;
        color: #fff;
      }
      &.picked {
        background: @primary-color;
        color: #fff;
      }
    }
  }
}
</style>



