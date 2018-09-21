<template>
  <div class="authorization">
    <x-header :left-options="{backText: ''}">我的授权书</x-header>
    <div class="authorize">
      <img v-if="img" :src="img" />
      <h3 v-else style="text-align:center;margin:1rem;"> 暂无数据</h3>
      <!-- <p>陈琴</p>
            <p>总代</p>
            <span>总代</span>
            <span>15797964844</span> -->
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux'
import AuthService from 'services/AuthenticationService'

export default {
  data() {
    return {
      img: ''
    }
  },
  components: {
    XHeader
  },
  async activated() {
    const result = await AuthService.getAuthorization()
    if (result.errno) {
      this.countDown = ''
      this.$vux.toast.show({
        width: '15em',
        type: 'warn',
        text: result.errmsg
      })
      return
    }
    this.img = result.data.picUrl || null
  }
}
</script>
<style lang='less' scoped>
.authorization {
  .authorize {
    img {
      width: 100%;
      height: auto;
    }
    p {
      &:nth-child(2) {
        position: absolute;
        top: 2.3rem;
        left: 38%;
      }
      &:nth-child(3) {
        position: absolute;
        top: 2.6rem;
        left: 30%;
      }
    }
    span {
      &:nth-child(4) {
        position: absolute;
        top: 3.44rem;
        left: 56%;
      }
      &:nth-child(5) {
        position: absolute;
        top: 3.69rem;
        left: 50%;
      }
    }
  }
}
</style>
