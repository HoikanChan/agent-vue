<template>
  <div class="myorder">
    <div class="myorder_head">
      <img class="back" src="../../assets/images/back.png" @click="$router.push({name:'user'})" /> 我的订单
    </div>
    <div class="things">
      <a :class="{'active':tabNow === 1}" @click="tabNow=1">全部</a>
      <a class="two" :class="{'active':tabNow === 2}" @click="tabNow=2">待发货</a>
      <a class="three" :class="{'active':tabNow === 3}" @click="tabNow=3">待收货</a>
    </div>
    <div class="shoppings">
      <div class="first" v-if="tabNow ===1">
        <div class="oreder-item" v-for="item in orders" :key="item.key">
          <div class="shophead" @click="view(item.id)">
            <img :src="$store.getters.getUser.avatar" />
            <span>{{item.userName}}</span>
            <i>{{item.orderStatusText}}</i>
          </div>
          <ul  @click="view(item.id)">
            <li v-for="product in item.orderGoodsEntityList" :key="product.key">
              <div class="left"><img :src="product.listPicUrl" /></div>
              <div class="right">
                <p class="name">{{product.goodsName}}
                  <!-- <span>(10支/一盒)</span> -->
                </p>
                <p class="msg">产品信息
                  <span>{{product.goodsSpecifitionNameValue}}</span>
                </p>
                <br>
                <!-- <p class="msg_">乳液体</p> -->
                <p class="price">￥{{product.marketPrice}}</p>
                <span class="number">×{{product.number}}</span>
              </div>
            </li>
          </ul>
          <div class="add">共
            <span>{{item.goodsCount}}</span>件商品 合计：￥
            <i>{{item.orderPrice}}</i>元(运费:{{item.shippingFee}}元)
            </div>
          <div class="logistics" v-show="item.orderStatus!='201'">
            <router-link to="#" class="blue" @click.native="confirm(item.id)">确认收货</router-link>
            <!-- <router-link to="#">查看物流</router-link> -->
          </div>
        </div>
        <div class="norecord" v-if="orders.length === 0">
          <img src="../../assets/images/noorder.png" />
          <p>你没有相关订单</p>
          <p>可以去看看有哪些想买的！</p>
        </div>
      </div>
      <div class="first" v-if="tabNow ===2">
        <div class="oreder-item" v-for="item in toDeleverOrder" :key="item.key">
          <div class="shophead"  @click="view(item.id)">
            <img :src="$store.getters.getUser.avatar" />
            <span>{{item.userName}}</span>
            <i>{{item.orderStatusText}}</i>
          </div>
          <ul  @click="view(item.id)">
            <li v-for="product in item.orderGoodsEntityList" :key="product.key">
              <div class="left"><img :src="product.listPicUrl" /></div>
              <div class="right">
                <p class="name">{{product.goodsName}}
                  <!-- <span>(10支/一盒)</span> -->
                </p>
                <p class="msg">产品信息
                  <span>{{product.goodsSpecifitionNameValue}}</span>
                </p>
                <br>
                <!-- <p class="msg_">乳液体</p> -->
                <p class="price">￥{{product.marketPrice}}</p>
                <span class="number">×{{product.number}}</span>
              </div>
            </li>
          </ul>
          <div class="add">共
            <span>{{item.goodsCount}}</span>件商品 合计：￥
            <i>{{item.orderPrice}}</i>元(运费:{{item.shippingFee}}元)
            </div>
          <div class="logistics">
            <router-link to="#" class="blue" @click.native="confirm(item.id)">确认收货</router-link>
            <!-- <router-link to="#" class="blue">查看详情</router-link> -->
            <!-- <router-link to="#" class="blue" @click.native="logistics(item.orderSn)">查看物流</router-link> -->
          </div>
        </div>
        <div class="norecord" v-if="toDeleverOrder.length === 0">
          <img src="../../assets/images/noorder.png" />
          <p>你没有相关订单</p>
          <p>可以去看看有哪些想买的！</p>
        </div>
      </div>
      <div class="first" v-if="tabNow ===3">
        <div class="oreder-item" v-for="item in toReceiveOrder" :key="item.key">
          <div class="shophead"  @click="view(item.id)">
            <img :src="$store.getters.getUser.avatar" />
            <span>{{item.userName}}</span>
            <i>{{item.orderStatusText}}</i>
          </div>
          <ul  @click="view(item.id)">
            <li v-for="product in item.orderGoodsEntityList" :key="product.key">
              <div class="left"><img :src="product.listPicUrl" /></div>
              <div class="right">
                <p class="name">{{product.goodsName}}
                  <!-- <span>(10支/一盒)</span> -->
                </p>
                <p class="msg">产品信息
                  <span>{{product.goodsSpecifitionNameValue}}</span>
                </p>
                <br>
                <!-- <p class="msg_">乳液体</p> -->
                <p class="price">￥{{product.marketPrice}}</p>
                <span class="number">×{{product.number}}</span>
              </div>
            </li>
          </ul>
          <div class="add">共
            <span>{{item.goodsCount}}</span>件商品 合计：￥
            <i>{{item.orderPrice}}</i>元(运费:{{item.shippingFee}}元)</div>
          <div class="logistics">
            <router-link to="#" class="blue" @click.native="confirm(item.id)">确认收货</router-link>
            <!-- <router-link to="#" class="blue" @click.native="view(item.id)">查看详情</router-link> -->
            <!-- <router-link to="#" class="blue" @click.native="logistics(item.id)">查看物流</router-link> -->
          </div>
        </div>
        <div class="norecord" v-if="toReceiveOrder.length === 0">
          <img src="../../assets/images/noorder.png" />
          <p>你没有相关订单</p>
          <p>可以去看看有哪些想买的！</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderService from 'services/OrderService'

export default {
  data() {
    return {
      tabNow: 1,
      orders: []
    }
  },
  computed: {
    toDeleverOrder: function() {
      return this.orders.filter(order => order.orderStatus === 201)
    },
    toReceiveOrder: function() {
      return this.orders.filter(order => order.orderStatus === 300)
    }
  },
  methods: {
    async confirm(orderId) {
      this.$vux.loading.show({
        text: 'Loading'
      })
      await OrderService.confirm(orderId)
      await this.update()
      this.$vux.loading.hide()
    },
    view(id) {
      this.$router.push({ name: 'order_detail', query: { id: id } })
    },
    async update() {
      const result = (await OrderService.get({
        offset: 0,
        limit: 10
      })).data
      this.orders = result
    }
  },
  async activated() {
    this.update()
  }
}
</script>
<style lang="less" scoped>
.myorder {
  padding-bottom: 1em;
  .oreder-item {
    margin-bottom: 1em;
  }
  .myorder_head {
    height: 0.44rem;
    line-height: 0.44rem;
    padding: 0 4.8%;
    text-align: center;
    font-size: 0.18rem;
    border-bottom: 1px solid #eee;
    .back {
      float: left;
      width: 0.09rem;
      height: auto;
      margin-top: 0.15rem;
    }
  }
  .things {
    height: 0.41rem;
    padding: 0 4.8%;
    background: #fff;
    a {
      display: block;
      width: 17.2%;
      height: 0.38rem;
      line-height: 0.41rem;
      text-align: center;
      float: left;
      font-size: 0.14rem;
    }
    .two {
      margin-left: 22%;
    }
    .three {
      margin-left: 22%;
    }
  }

  .shoppings {
    margin-top: 0.1rem;
    .first {
      .shophead {
        height: 0.4rem;
        line-height: 0.4rem;
        background: #fff;
        padding: 0 4.8%;
        border-bottom: 1px solid #eee;
        img {
          width: 0.23rem;
          height: 0.23rem;
          border-radius: 50%;
        }
        span {
          padding-left: 1.2%;
          font-size: 0.15rem;
        }
        i {
          float: right;
          font-size: 0.13rem;
          color: #5b50d3;
        }
      }
      ul {
        background: #fff;
        li {
          height: 1.41rem;
          padding: 0 4.8%;
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #eee;
          &:first-child {
            border-top: none;
          }
          .left {
            width: 1.1rem;
            height: 1.1rem;
            margin-top: 0.15rem;
            img {
              width: 1.1rem;
              height: 1.1rem;
            }
          }
          .right {
            width: 58%;
            height: 1.41rem;
            .name {
              font-size: 0.14rem;
              font-weight: 500;
              height: 0.22rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              color: #000;
              margin: 0.12rem 0 0 0;
            }
            .msg {
              font-size: 0.13rem;
              color: #666;
              margin-top: 0.06rem;
            }
            .msg_ {
              font-size: 0.13rem;
              color: #666;
              margin-top: 0.05rem;
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
      .add {
        height: 0.43rem;
        line-height: 0.43rem;
        border-bottom: 1px solid #eee;
        background: #fff;
        font-size: 0.13rem;
        text-align: right;
        padding-right: 4.8%;
        i {
          font-size: 0.15rem;
        }
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
.add {
  height: 0.43rem;
  line-height: 0.43rem;
  border-bottom: 1px solid #eee;
  background: #fff;
  font-size: 0.13rem;
  text-align: right;
  i {
    font-size: 0.15rem;
  }
}
.logistics {
  width: 100%;
  height: 0.53rem;
  background: #fff;
  a {
    display: block;
    width: 16.5%;
    height: 0.22rem;
    line-height: 0.22rem;
    text-align: center;
    border: 1px solid #999;
    float: right;
    border-radius: 0.03rem;
    margin-right: 4.8%;
    margin-top: 0.15rem;
    font-size: 0.13rem;
    color: #000;
  }
  .blue {
    color: #5b50d3;
    border: 1px solid #5b50d3;
  }
}
.norecord {
  text-align: center;
  img {
    width: 1.58rem;
    height: auto;
    margin-top: 1.03rem;
  }
  p {
    font-size: 0.15rem;
    color: #9890ec;
    &:nth-child(2) {
      margin-top: 0.35rem;
    }
  }
}
.active {
  border-bottom: 0.04rem solid #5b50d3;
  color: #5b50d3;
}
</style>
