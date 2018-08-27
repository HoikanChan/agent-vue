<template>
  <div>
    <x-header :left-options="{backText: ''}" style="border-bottom: 1px solid #ccc ;">等待审核</x-header>
    <div class="top-part">
      <img src='../../assets/images/bought_bg.png' alt="">
      <p>恭喜你</p>
      <p>你已成功注册，请等待审核！</p>
    </div>
    <div class="bottom-part">
      <x-button type="primary" style="width:90%;font-size: 0.16rem;">我知道了</x-button>
    </div>
  </div>
</template>
<script>
import { XButton, XHeader } from 'vux'
export default {
  components: {
    XButton,
    XHeader
  }
}
</script>
<style lang="less" scoped>
div.top-part {
  margin-bottom: 10vh;
  p {
    color: #fff;
    position: absolute;
    top: 28%;
    // top: 1.8rem;
    left: 50%;
    font-size: 0.2rem;
    transform: translateX(-50%);
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) {
    p {
      top: 23%;
    }
  }
  img {
    width: 100%;
  }
}
div.bottom-part {
  margin-top: 18vh;
}
</style>

