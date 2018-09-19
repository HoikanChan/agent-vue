<template>
  <div class="usersetting">
    <x-header :left-options="{backText: ''}">
      <span>实名认证状态</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.push({name:'user'})">
    </x-header>
    <group>
      <p class="info-cell">
        <span>用户名</span>
        <span style="display:flex;align-items:center;">
          <span style="color: #999;">{{info.username}}</span>
        </span>
      </p>
      <p class="info-cell">
        <span>手机号码</span>
        <span style="display:flex;align-items:center;">
          <span style="color: #999;">{{info.mobile}}</span>
        </span>
      </p>
      <p class="info-cell">
        <span>真实姓名</span>
        <span style="display:flex;align-items:center;">
          <span style="color: #999;">{{info.realName}}</span>
        </span>
      </p>
      <p class="info-cell">
        <span>审核状态</span>
        <span style="display:flex;align-items:center;">
          <span style="color: #999;">{{info.statusName}}</span>
        </span>
      </p>
      <p class="avatar-cell">
        <span style="margin-bottom:1em;">
          身份证正面照
        </span>
        <img :src="info.picHead"  alt="">
      </p>
      <p class="avatar-cell">
        <span style="margin-bottom:1em;">
          身份证背面照
        </span>
        <img :src="info.picTail"  alt="">
      </p>
    </group>
    <div class="loginout" @click="$router.push({name:'realName'})">重新认证</div>
  </div>
</template>
<script>
import AuthService from 'services/AuthenticationService'
import { XButton, XInput, Group, XHeader } from 'vux'
export default {
  name: 'UserSetting',
  components: {
    XButton,
    XInput,
    Group,
    XHeader
  },
  data() {
    return {
      info: {}
    }
  },
  async activated() {
    this.info = (await AuthService.viewUserCertification()).data || {}
  }
}
</script>
<style scoped lang="less">
.info-cell {
  padding: 13px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  img {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
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
.loginout {
  width: 77.4%;
  height: 0.4rem;
  background: #5b50d3;
  line-height: 0.4rem;
  text-align: center;
  margin: 0.27rem auto;
  margin-bottom: 0;
  border-radius: 0.08rem;
  font-size: 0.14rem;
  color: white;
}
</style>
