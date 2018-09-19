<template>
  <div class="realname-container">
    <x-header :left-options="{backText: ''}">
      <span>实名认证</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
    </x-header>
    <div class="content">
      <group>
        <x-input label-width="1rem" title="真实姓名" placeholder="请输入名字" :required="true" ref="mobile" v-model="form.realName " :is-type="cnNameValidator">
        </x-input>
        <!-- <x-input style="border:none;" label-width="1rem" title="身份证号码" type="text" placeholder="请输入身份证" :required="true" ref="code" v-model="form.idCard" :is-type="idCard">
        </x-input> -->
        <p class="avatar-cell">
          <span style="margin-bottom:1em;">
            身份证正面照
          </span>
          <vue-core-image-upload :crop="false" @imageuploading="imageuploading" @imageuploaded="picHeaduploaded" :data="data" :max-file-size="5242880" :url="uploadUrl">

            <img :src="form.picHead" v-if="form.picHead" alt="">
            <img v-else src="../../assets/images/banner2.png" alt="">
          </vue-core-image-upload>
        </p>
        <p class="avatar-cell">
          <span style="margin-bottom:1em;">
            身份证背面照
          </span>
          <vue-core-image-upload :crop="false" @imageuploading="imageuploading" @imageuploaded="picTailuploaded" :data="data" :max-file-size="5242880" :url="uploadUrl">
            <img :src="form.picTail" v-if="form.picTail" alt="">
            <img v-else src="../../assets/images/banner2.png" alt="">
          </vue-core-image-upload>
        </p>
      </group>
      <x-button style="margin-top:48px;width: 90%;border-radius: 6px;font-size: 16px;" type="primary" action-type="submit" @click.native="confirm()">确定</x-button>
    </div>
  </div>
</template>
<script>
import { XButton, XInput, Group, XHeader } from 'vux'
import VueCoreImageUpload from 'vue-core-image-upload'
import { uploadUrl } from 'services/Api'
import AuthService from 'services/AuthenticationService'

export default {
  name: 'RealName',
  components: {
    XButton,
    XInput,
    Group,
    XHeader,
    VueCoreImageUpload
  },
  data: function() {
    return {
      cnNameValidator: function(value) {
        return {
          valid: value.match(/^[\u4e00-\u9fa5]{2,7}$/),
          msg: '请输入真实名字'
        }
      },
      idCard: function(value) {
        return {
          valid: value.match(
            /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
          ),
          msg: '请输入正确的身份证号'
        }
      },
      data: {},
      uploadUrl: uploadUrl,
      form: {
        realName: '',
        picHead: '',
        picTail: ''
      }
    }
  },
  methods: {
    async confirm() {
      if (
        !this.$refs.mobile.valid ||
        !this.form.picHead ||
        !this.form.picTail
      ) {
        this.$vux.toast.show({
          width: '12em',
          type: 'warn',
          text: '请先完善实名信息'
        })
        return
      }
      const result = await AuthService.applyUserCertification(this.form)
      if (result.errno !== 0) {
        this.countDown = ''
        this.$vux.toast.show({
          width: '15em',
          type: 'warn',
          text: result.errmsg
        })
        return
      }
      this.$vux.toast.show({
        width: '10em',
        type: 'success',
        text: '成功，等待审核'
      })
      setTimeout(() => {
        this.$router.push({ name: 'userSetting' })
      }, 2000)
    },
    imageuploading() {
      this.$vux.loading.show({
        text: '正在上传'
      })
    },
    picHeaduploaded(res) {
      this.$vux.loading.hide()
      if (res.errno == 0) {
        this.form.picHead = res.data.url
      } else {
        this.$vux.toast.show({
          width: '10em',
          type: 'warn',
          text: res.errmsg
        })
      }
    },
    picTailuploaded(res) {
      this.$vux.loading.hide()
      if (res.errno == 0) {
        this.form.picTail = res.data.url
      } else {
        this.$vux.toast.show({
          width: '10em',
          type: 'warn',
          text: res.errmsg
        })
      }
    }
  }
}
</script>

<style lang="less">
.realname-container {
  .avatar-cell {
    padding: 13px 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    img {
      width: 100%;
    }
    &:before {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #eee;
      color: #eee;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 15px;
    }
  }
  .content {
    padding: 0.1rem 0;
    .vux-x-icon {
      fill: #333;
    }
    .weui-cells {
      width: 90%;
      margin: 0 auto;
      &:before {
        border: none;
      }
      &:after {
        border: none;
      }
    }
    .weui-cell {
      border-bottom: 1px solid #eee;
      padding: 13.5px;
      &:before {
        border: none;
      }
    }
  }
  .weui-input {
    font-size: 0.12rem;
    color: #999;
  }
  .vux-header {
    border-bottom: 1px solid #eee;
  }
  // .weui-cell{
  //   &:first-child{
  //     border-radius: 6px;
  //   }
  //   &:nth-child(2){
  //     border-radius: 0 6px;
  //   }
  // }
  .vux-no-group-title {
    border-radius: 6px;
  }
  .weui-cell:before {
    border: none;
  }
}
</style>
