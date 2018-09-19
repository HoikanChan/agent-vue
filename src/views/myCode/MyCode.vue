<template>
  <div class="code_user">
    <x-header :left-options="{backText: ''}" style="border-bottom:none;">
      <span>我的二维码</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
    </x-header>
    <div class="code">
      <div class="head_msg">
        <div> <img :src="user.avatar || defaultAvatar" alt=""></div>
        <div>
          <p>{{user.username}}</p>
          <p>{{user.location ||"地区信息暂无"}}</p>
        </div>
      </div>
      <img class="msg_code" :src="qrcode" />
      <p>推荐码：{{user.referralCode}}</p>
      <p>扫一扫上面的二维码，可加盟代理</p>
    </div>
  </div>
</template>
<script>
import AuthService from 'services/AuthenticationService'
import defaultAvatar from 'assets/images/avatar.png'

import { XHeader, XImg } from 'vux'
export default {
  data() {
    return {
      qrcode: null,
      user: {},
      defaultAvatar: defaultAvatar
    }
  },
  components: {
    XHeader,
    XImg
  },
  async activated() {
    const result = (await AuthService.getQrCode()).data
    this.qrcode = result ? result.qrCode : null
    const user = (await AuthService.userinfo()).data
    this.user = user ? user : {}
  }
}
</script>
<style lang='less' scoped>
body {
  background: url('../../assets/images/code_bg.png');
}
.code_user {
  .code {
    width: 87%;
    height: 4.37rem;
    margin: 12% auto;
    background: #fff;
    border-radius: 0.04rem;
    text-align: center;
    .head_msg {
      height: 1.2rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      div {
        &:first-child {
          padding-left: 8%;
          img {
            width: 0.67rem;
            height: 0.67rem;
            border-radius: 0.03rem;
            margin: 0;
          }
        }
        &:nth-child(2) {
          height: 0.6rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          text-align: left;
          padding-right: 8%;
          p {
            margin: 0;
            &:first-child {
              font-size: 0.17rem;
              font-weight: bold;
            }
            &:nth-child(2) {
              font-size: 0.15rem;
              color: rgb(153, 153, 153);
            }
          }
        }
      }
    }
    p {
      margin-top: 0.1rem;
      color: rgb(102, 102, 102);
    }
  }
}
</style>
