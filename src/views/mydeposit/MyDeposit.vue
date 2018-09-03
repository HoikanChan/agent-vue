<template>
    <div class="deposit">
        <x-header :left-options="{backText: ''}">我的押金</x-header>
        <ul>
            <li><p>大区代理</p><span>押金￥2000元</span></li>
            <li><p>押金状态</p><span>押金已扣除</span></li>
            <li><p>扣除时间</p><span>2018-8-30</span></li>
        </ul>
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
<style lang="less">
.deposit {
  ul {
    li {
      height: 0.53rem;
      line-height: 0.53rem;
      border-bottom: 1px solid #ccc;
      background: #fff;
      padding: 0 4.8%;
      font-size: 0.14rem;
      p {
        display: inline-block;
        color: #666;
      }
      span {
        float: right;
      }
      &:first-child {
        color: #5b50d3;
      }
    }
  }
}
</style>
