<template>
    <div class="logistics">
        <x-header :left-options="{backText: ''}" >
        <span>查看物流</span>
         <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.push({name:'myorder'})">
        </x-header>
        <ul class="conpany">
            <li>
            <img :src="pic.listPicUrl" alt=""/>
            </li>
            <li>
                <p>物流状态：<span>{{data.orderInfo.orderStatusText}}</span></p>
                <p>快递公司：<span>{{data.orderInfo.shippingName||'暂无'}}</span></p>
                <p>订单编号：<span>{{data.orderInfo.shippingNo||'暂无订单号'}}</span></p>
            </li>
        </ul>
        <ul class="informations">
            <li v-for="item in data.shippingList" :key="item.key">
                <p>{{item.AcceptStation}}</p>
                <p>{{item.AcceptTime}}</p>
                
            </li>
        </ul>
        <div style="text-align:center;" v-if="data.length===0">暂时没有物流信息</div>
    </div>
</template>
<script>
import { XHeader } from 'vux'
import axios from 'axios'
import { host } from 'services/Api'
import { Flow, FlowState, FlowLine } from 'vux'

export default {
  data() {
    return {
      data: [],
      pic: ''
    }
  },
  components: {
    XHeader,
    Flow,
    FlowState,
    FlowLine
  },
  mounted() {
    const orderId = this.$route.params.orderId
    axios
      .get(host + 'order/detail?orderId=' + orderId)
      .then(res => {
        this.data = res.data.data
        // console.log(res.data.data.orderGoods[0])
        this.pic = res.data.data.orderGoods[0]
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
.logistics {
  .conpany {
    height: 1.41rem;
    background: #fff;
    display: flex;
    align-items: center;
    img {
      width: 1.1rem;
      height: 1.1rem;
    }
    li {
      &:nth-child(1) {
        margin-left: 4.8%;
      }
      &:nth-child(2) {
        height: 1.4rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left: 3%;
      }
      p {
        padding: 0.1rem 0 0;
      }
    }
  }
  .informations {
    margin-top: 0.1rem;
    background: #fff;
    li {
      padding: 0.1rem;
      p {
        padding: 0.1rem;
      }
    }
  }
}
</style>
