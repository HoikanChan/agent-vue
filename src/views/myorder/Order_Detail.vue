<template>
  <div class="order_detail">
    <x-header :left-options="{backText: ''}" style="border-bottom:none;">
      <span>订单详情</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
    </x-header>
    <div class="ordernumber">
      <p>{{orderInfo.orderStatusText}}</p>
      <p class="number">订单编号:
        <span>{{orderInfo.orderSn}}</span>
      </p>
    </div>
    <div class="address">
      <div class="top">
        <p>收货人：
          <span>{{orderInfo.consignee}}</span>
        </p>
        <p class="right">联系电话：
          <span>{{orderInfo.mobile}}</span>
        </p>
      </div>
      <div class="loation">
        <img src="../../assets/images/location.png" />
        <div class="locate">
          <span>收货地址:
            <i>{{orderInfo.address}}</i>
          </span>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="item in info.orderGoods" :key="item.id">
        <div class="left"><img :src="item.listPicUrl" /></div>
        <div class="right">
          <p class="name">{{item.goodsName}}
            <!-- <span>(10支/一盒)</span> -->
          </p>
          <p class="msg">产品信息
            <span>{{item.goodsSpecifitionNameValue}}</span>
          </p>
          <!-- <p class="msg_">乳液体</p> -->
          <br>
          <p class="price">￥{{item.marketPrice}}</p>
          <span class="number">×{{item.number}}</span>
        </div>
      </li>
    </ul>
    <div class="order_price">
      <p>商品总价
        <span>{{orderInfo.actualPrice}}</span>
      </p>
    </div>
    <div class="order_time">
      <p>下单时间
        <span>{{orderInfo.payTime}}
        </span>
      </p>
    </div>
    <div class="buyer">
      <h3>买家留言</h3>
      <p>{{orderInfo.postscript}}</p>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux'
import OrderService from 'services/OrderService'

export default {
  components: {
    XHeader
  },
  data() {
    return {
      info: {}
    }
  },
  computed: {
    orderInfo: function() {
      return this.info ? this.info.orderInfo : {}
    }
  },
  async activated() {
    const result = await OrderService.detail(this.$route.query.id)
    this.info = result.data || {}
  }
}
</script>
<style lang="less" scoped>
.order_detail {
  .detail_head {
    height: 0.44rem;
    line-height: 0.44rem;
    padding: 0 4.8%;
    text-align: center;
    font-size: 0.18rem;
    border-bottom: 1px solid #ccc;
    .back {
      float: left;
      width: 0.1rem;
      height: 0.16rem;
      margin-top: 0.15rem;
    }
  }
  .ordernumber {
    height: 0.84rem;
    background: url('../../assets/images/order_bg.png') no-repeat center/cover;
    p {
      font-size: 0.13rem;
      color: #fff;
      padding-left: 12%;
      width: 2rem;
      padding-top: 0.2rem;
    }
    .number {
      padding-top: 0;
    }
  }
  .address {
    height: 1.04rem;
    padding: 0 4.8%;
    background: #fff;
    .top {
      width: 100%;
      height: 0.42rem;
      p {
        display: inline-block;
        margin-left: 7.2%;
        font-size: 0.13rem;
        height: 0.22rem;
        line-height: 0.22rem;
        margin-top: 0.2rem;
        font-weight: bold;
        float: left;
      }
      .right {
        float: right;
      }
    }
    .loation {
      width: 100%;
      height: 0.5rem;
      margin-top: 0.12rem;
      img {
        display: inline-block;
        width: 0.17rem;
        height: 0.22rem;
        float: left;
      }
      .locate {
        width: 90%;
        height: 0.5rem;
        float: right;
        font-size: 0.13rem;
        padding-left: 2%;
        span {
          height: 0.15rem;
          line-height: 0.15rem;
        }
      }
    }
  }
  ul {
    li {
      height: 1.41rem;
      padding: 0 4.8%;
      border-bottom: 1px solid #ccc;
      .left {
        width: 1.1rem;
        height: 1.1rem;
        margin-top: 0.15rem;
        float: left;
        img {
          width: 1.1rem;
          height: 1.1rem;
        }
      }
      .right {
        float: right;
        width: 60%;
        height: 1.41rem;
        .name {
          font-size: 0.14rem;
          margin-top: 0.12rem;
          font-weight: bold;
        }
        .msg {
          font-size: 0.13rem;
          color: #666;
          margin-top: 0.06rem;
        }
        .msg_ {
          font-size: 0.13rem;
          color: #666;
        }
        .price {
          font-size: 0.2rem;
          color: #5b50d3;
          font-weight: bold;
          margin-top: 0.28rem;
          display: inline-block;
        }
        .number {
          float: right;
          margin-top: 0.28rem;
          font-size: 0.2rem;
        }
      }
    }
  }
  .order_price {
    height: 0.42rem;
    border-bottom: 1px solid #eee;
    padding: 0 4.8%;
    background: #fff;
    p {
      height: 0.42rem;
      line-height: 0.42rem;
      font-size: 0.13rem;
      color: #666;
      font-weight: bold;
      span {
        float: right;
        font-weight: bold;
        font-size: 0.14rem;
        color: #5b50d3;
      }
    }
  }
  .order_time {
    height: 0.42rem;
    border-bottom: 1px solid #eee;
    padding: 0 4.8%;
    background: #fff;
    p {
      height: 0.42rem;
      line-height: 0.42rem;
      font-size: 0.13rem;
      color: #666;
      font-weight: bold;
      span {
        float: right;
        font-weight: bold;
        font-size: 0.14rem;
        color: #666;
        i {
          font-weight: bold;
        }
      }
    }
  }
  .buyer {
    height: 0.68rem;
    background: #fff;
    padding: 0 4.8%;
    h3 {
      display: inline-block;
      height: 0.17rem;
      line-height: 0.17rem;
      padding-top: 0.13rem;
    }
    p {
      display: inline-block;
      padding-left: 1%;
    }
  }
}
ul li:last-child {
  border-bottom: none;
}
</style>
