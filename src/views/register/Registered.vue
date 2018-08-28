<template>
  <div>
    <x-header :left-options="{backText: ''}" style="border-bottom: 1px solid #ccc ;">等待审核</x-header>
    <div class="top-part">
      <img src='../../assets/images/wait.png' alt="">
      <p>恭喜你</p>
      <p>你已成功注册，请等待审核！</p>
    </div>
    <div class="bottom-part">
      <x-button type="primary" style="width:76.8%;font-size: 0.18rem;height:.5rem;">我知道了</x-button>
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
    &:nth-child(2){
      color: #de0116;
      font-size: .28rem;
      font-weight: bold;
      top: 2.4rem;
    }
    &:nth-child(3){
      color: #333;
      font-size: .15rem;
      top: 2.93rem;
    }
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
  margin-top: 1.92rem;
}
</style>

