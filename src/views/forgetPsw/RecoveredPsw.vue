<template>
  <div>
    <x-header :left-options="{backText: ''}">修改密码</x-header>
    <div class="content">
      <p>恭喜你！</p>
      <p>新密码设置成功</p>
    </div>
    <x-button @click.native="$router.push({ name: 'login' })" type="primary" class="round-btn" style="width:90%">登录</x-button>
  </div>
</template>
<script>
import { XButton, XHeader } from 'vux'
import AuthService from 'services/AuthenticationService'

export default {
  name: 'Login',
  components: {
    XButton,
    XHeader
  }
}
</script>
<style lang="less" scoped>
.content {
  text-align: center;
  padding: 1rem 0;
  p {
    text-align: center;
    font-size: 0.2rem;
  }
}
</style>
