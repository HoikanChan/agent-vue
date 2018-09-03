<template>
    <div class="authorization">
        <x-header :left-options="{backText: ''}">我的授权书</x-header>
        <div class="authorize">
            <img src="../../assets/images/authorization.png"/>
            <p>陈琴</p>
            <p>总代</p>
            <span>总代</span>
            <span>15797964844</span>
        </div>
    </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
  data() {
    return {}
  },
  components: {
    XHeader
  }
}
</script>
<style lang='less'>
.authorization {
  .authorize {
    // background: url('../../assets/images/authorization.png') no-repeat center;
    // background-size: cover;
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
