<template>
  <div class="register-container">
    <span style="position:absolute;top:18px;left:18px">
      <x-icon type="ios-close-empty" size="30"></x-icon>
    </span>
    <x-header :left-options="{backText: ''}" style="border-bottom: 1px solid #eee ;">
      <span>注册</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
    </x-header>
    <group style="padding:.2rem">
      <x-input label-width="1rem" title="手机号码" placeholder="请输入手机号码" :required="true" ref="mobile" v-model="form.mobile" is-type="china-mobile">
      </x-input>
      <x-input label-width="1rem" title="图片验证码" type="text" placeholder="请输入图片验证码" :required="true" ref="imgcode" v-model="form.imgCode">
        <img v-if="imgcode" slot="right" :src='imgcode' type="primary" mini @click="getImgCode()" style="width: 1rem;" />
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
      <x-input label-width="1rem" readonly title="注册等级" type="text" placeholder="请选择等级" :required="true" ref="userLevel" v-model="form.userLevel">
        <x-icon slot="right" type="ios-arrow-forward" mini @click.native="show=true" size="15"></x-icon>
      </x-input>
      <x-input label-width="1rem" title="邀请人" type="text" placeholder="系统根据邀请码自动识别" readonly ref="referralName" v-model="referrerName">
      </x-input>
      <x-input label-width="1rem" title="邀请码" type="text" placeholder="请输入推荐人的名字邀请码"  :required="true" ref="referralCode" v-model="form.referralCode">
      </x-input>
      <x-input label-width="1rem" title="审核凭证" type="text" readonly placeholder="请上传支付凭证图片" ref="payOrder" v-model="form.payOrder">
        <vue-core-image-upload slot="right" :crop="false" @imageuploading="imageuploading" @imageuploaded="imageuploaded" :data="data" :max-file-size="5242880" :url="uploadUrl">
          <img src="../../assets/images/upload.png" type="ios-arrow-forward" mini @click.native="show=true" style="width:2em" />
        </vue-core-image-upload>
      </x-input>
      <div v-show="form.payPicUrl" style="padding:1em">
        <img :src="form.payPicUrl" alt="" style=" width: 100%; height: 100%;">
      </div>
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
import VueCoreImageUpload from 'vue-core-image-upload'
import { uploadUrl } from 'services/Api'

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
    Popup,
    'vue-core-image-upload': VueCoreImageUpload
  },
  data() {
    return {
      data: {},
      imgcode: AuthService.registerCode,
      uploadUrl: uploadUrl,
      form: {
        referralCode: this.$route.query.referralCode || null
      },
      referralName: this.$route.query.userName || null,
      referrer: {},
      popupPickedgrade: '',
      show: false,
      gradeList: [],
      countDown: '',
      cnNameValidator: function(value) {
        return {
          valid: value.match(/^[\u4e00-\u9fa5]{2,5}$/),
          msg: '请输入2-5个汉字'
        }
      }
    }
  },
  computed: {
    referrerName: function() {
      if (this.referrer) {
        return this.referrer.nickname
      } else {
        return ''
      }
    }
  },
  methods: {
    getImgCode() {
      this.imgcode = '1'
      setTimeout(() => {
        this.imgcode = AuthService.registerCode
      }, 10)
    },
    imageuploading() {
      this.$vux.loading.show({
        text: '正在上传'
      })
    },
    imageuploaded(res) {
      this.$vux.loading.hide()
      if (res.errno == 0) {
        this.form.payPicUrl = res.data.url
      }
    },
    async sendCode() {
      if (this.$refs.mobile.valid) {
        if (this.$refs.imgcode.valid) {
          if (typeof this.countDown === 'number') return
          this.countDown = 60
          const result = await AuthService.sendCode(
            this.form.mobile,
            this.form.imgCode
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
            text: '请先输入图片验证码'
          })
        }
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
        this.$refs.code.valid &&
        this.$refs.referralCode.valid
      ) {
        this.$vux.loading.show({
          text: '注册中..'
        })
        const result = await AuthService.register(this.form)
        this.$vux.loading.hide()
        if (result.errno || result.code) {
          this.$vux.toast.show({
            width: '10em',
            type: 'warn',
            text: result.errmsg || result.msg
          })
        } else {
          this.$router.push({ name: 'registered' })
        }
      } else {
        this.$vux.toast.show({
          width: '10em',
          type: 'warn',
          text: '请完善注册信息'
        })
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
  },
  async activated() {
    const referralCode = this.$route.query.referralCode
    if (referralCode) {
      this.referrer = (await AuthService.getReferrer(referralCode)).data || {}
    }
  }
}
</script>
<style lang="less">
.register-container {
  padding-bottom: 5em;
  .weui-cells {
    font-size: 0.15rem !important;
    // box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    //   10px 10px 10px 0px rgba(189, 188, 188, 0.14),
    //   0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    border-radius: 0.03rem;
    box-shadow: 0px 4px 10px 0px #d3d0d0;
  }
}
</style>
<style lang="less">
.weui-label {
  color: #333;
  font-size: 0.13rem;
  font-weight: 500;
}
.weui-input {
  color: #ccc !important;
  font-size: 0.12rem !important;
  font-weight: 500;
}
.weui-btn_mini {
  height: 0.28rem !important;
  line-height: 0.28rem !important;
  width: 0.76rem !important;
  font-size: 0.12rem !important;
  padding: 0 !important;
  margin: 0 !important;
}
.weui-btn_primary {
  width: 0.74rem;
}
.weui-btn_plain-default {
  color: #333;
}
#code {
  width: 0.74rem;
}
.weui-cell:before {
  border-top: 1px solid #eee !important;
}
.weui-cell {
  padding: 14.5px 15px !important;
}
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
