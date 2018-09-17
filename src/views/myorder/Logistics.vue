<template>
    <div class="logistics">
        <x-header :left-options="{backText: ''}">
            <span>查看物流</span>
            <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
        </x-header>
        <div class="course">
            <div><img src="../../assets/images/main.png" /></div>
            <div>
                <p>物流状态：<span>已发货</span></p>
                <p>快递公司：<span>圆通快递</span></p>
                <p>运单编号：<span>886789387286545685</span></p>
            </div>
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
<style lang='less' scoped>
.logistics {
  .course {
    padding: 0 4.8%;
    display: flex;
    background: #fff;
    height: 1.4rem;
    div {
      &:first-child {
        img {
          width: 1.1rem;
          height: auto;
          margin-top: 0.15rem;
        }
      }
      &:nth-child(2) {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-left: 2.6%;
      }
    }
  }
}
</style>
