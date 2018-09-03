<template>
  <div class="code_user">
    <div class="code_top">
      我的二维码
      <img src="../../assets/images/back.png" @click="$router.go(-1)"/>
    </div>
    <div>
      <!-- <img src="../../assets/images/msg_code.png" /> -->
      <div class="head_msg">
        <div> <img :src="user.avatar || defaultAvatar" alt=""></div>
        <div>
          <p>{{user.nickname}}</p>
          <p>{{user.location}}</p>
        </div>
      </div>
      <img class="msg_code" :src="qrcode" />
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
  async mounted() {
    const result = (await AuthService.getQrCode()).data
    this.qrcode = result ? result.qrcode : null
    const user = (await AuthService.userinfo()).data
    this.user = user ? user : {}
  }
}
</script>
<style>
.code_user .code_top {
  width: 100%;
  height: 0.45rem;
  background: #fff;
  line-height: 0.45rem;
  text-align: center;
  font-size: 0.18rem;
  position: relative;
}
.code_user .code_top img {
  position: absolute;
  top: 0.14rem;
  left: 4.8%;
  width: 0.09rem;
  height: 0.16rem;
}
/* body{
    background: url('../../assets/images/code_bg.png') no-repeat center/cover;
} */
.code_user div:nth-child(2) {
  width: 87.2%;
  height: 4.37rem;
  background: #fff;
  margin: 0.75rem auto;
  border-radius: 0.04rem;
}
.code_user div:nth-child(2) .head_msg {
  width: 100%;
  height: 0.67rem;
}
.code_user div:nth-child(2) .head_msg div {
  float: left;
}
.code_user div:nth-child(2) .head_msg div:first-child {
  width: 0.67rem;
  height: 0.67rem;
  margin-left: 9%;
  margin-top: 0.3rem;
}
.code_user div:nth-child(2) .head_msg div:first-child img {
  width: 0.67rem;
  height: auto;
  border-radius: 0.04rem;
}
.code_user div:nth-child(2) .head_msg div:nth-child(2) {
  width: 54%;
  height: 0.67rem;
  margin: 0;
  margin-top: 0.3rem;
  margin-left: 3%;
}
.code_user div:nth-child(2) .head_msg div:nth-child(2) p:nth-child(1) {
  margin-top: 0.06rem;
  font-size: 0.17rem;
  font-weight: bold;
  text-align: left;
}
.code_user div:nth-child(2) .head_msg div:nth-child(2) p:nth-child(2) {
  margin-top: 0.08rem;
  font-size: 0.15rem;
  color: #999;
  text-align: left;
}
.msg_code {
  width: 2.4rem;
  height: 2.4rem;
  margin-left: 13.4%;
  margin-top: 0.2rem;
}
.code_user div:nth-child(2) p {
  text-align: center;
  margin-top: 0.32rem;
  color: #666;
}
</style>
