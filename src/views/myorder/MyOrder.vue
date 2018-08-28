<template>
  <div class="myorder">
    <div class="myorder_head">
      <img class="back" src="../../assets/images/back.png" /> 我的订单
    </div>
    <div class="things">
      <a :class="{'active':tabNow === 1}" @click="tabNow=1">全部</a>
      <a class="two" :class="{'active':tabNow === 2}" @click="tabNow=2">待发货</a>
      <a class="three" :class="{'active':tabNow === 3}" @click="tabNow=3">待收货</a>
    </div>
    <div class="shoppings">
      <div class="first" v-if="tabNow ===1">
        <div class="shophead">
          <img src="../../assets/images/9.jpg" />
          <span>代理商的昵称</span>
          <i>已发货</i>
        </div>
        <ul>
          <li>
            <div class="left"><img src="../../assets/images/22.jpg" /></div>
            <div class="right">
              <p class="name">好吃的可爱多1
                <span>(10支/一盒)</span>
              </p>
              <p class="msg">产品信息
                <span>10支/一盒</span>
              </p>
              <p class="msg_">乳液体</p>
              <p class="price">￥990.00</p>
              <span class="number">×12</span>
            </div>
          </li>
        </ul>
        <div class="add">共
          <span>1</span>件商品 合计：￥
          <i>990.00</i>元(不含运费)</div>
        <div class="logistics">
          <router-link to="#" class="blue">确认收货</router-link>
          <router-link to="#">查看物流</router-link>
        </div>
      </div>
      <div class="first" v-if="tabNow ===2">
        <div class="shophead">
          <img src="../../assets/images/9.jpg" />
          <span>代理商的昵称</span>
          <i>待发货</i>
        </div>
        <ul>
          <li>
            <div class="left"><img src="../../assets/images/22.jpg" /></div>
            <div class="right">
              <p class="name">好吃的可爱多2
                <span>(10支/一盒)</span>
              </p>
              <p class="msg">产品信息
                <span>10支/一盒</span>
              </p>
              <p class="msg_">乳液体</p>
              <p class="price">￥990.00</p>
              <span class="number">×12</span>
            </div>
          </li>
        </ul>
        <div class="add">共
          <span>1</span>件商品 合计：￥
          <i>990.00</i>元(不含运费)</div>
        <div class="logistics">
          <router-link to="#" class="blue">确认收货</router-link>
          <router-link to="#">查看物流</router-link>
        </div>
      </div>
      <div class="first" v-if="tabNow ===3">
        <div class="shophead">
          <img src="../../assets/images/9.jpg" />
          <span>代理商的昵称</span>
          <i>待收货</i>
        </div>
        <ul>
          <li>
            <div class="left"><img src="../../assets/images/22.jpg" /></div>
            <div class="right">
              <p class="name">好吃的可爱多3
                <span>(10支/一盒)</span>
              </p>
              <p class="msg">产品信息
                <span>10支/一盒</span>
              </p>
              <p class="msg_">乳液体</p>
              <p class="price">￥990.00</p>
              <span class="number">×12</span>
            </div>
          </li>
        </ul>
        <div class="add">共
          <span>1</span>件商品 合计：￥
          <i>990.00</i>元(不含运费)</div>
        <div class="logistics">
          <router-link to="#" class="blue">确认收货</router-link>
          <router-link to="#">查看物流</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabNow: 1
    }
  },
  mounted() {}
}
</script>
<style lang="less">
<<<<<<< HEAD
.myorder{
    .myorder_head{
        height: .44rem;
        line-height: .44rem;
        padding: 0 4.8%;
        text-align: center;
        font-size: .18rem;
        border-bottom: 1px solid #ccc;
        .back{
            float: left;
            width: .1rem;
            height: .16rem;
            margin-top: .15rem;
           
        }
    }
    .things{
        height: .41rem;
        padding: 0 4.8%;
=======
.myorder {
  .myorder_head {
    width: 100%;
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
  .things {
    width: 100%;
    height: 0.41rem;
    padding: 0 4.8%;
    background: #fff;
    border-bottom: 1px solid #ccc;
    a {
      display: block;
      width: 17.2%;
      height: 0.41rem;
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
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
>>>>>>> 3c70d07d0e2fd48f0345335e418da3a32f928219
        background: #fff;
        padding: 0 4.8%;
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
    .shoppings{
        margin-top: .1rem;
        .first{
            .shophead{
                height: .4rem;
                line-height: .4rem;
                background: #fff;
                padding: 0 4.8%;
                img{
                    width: .23rem;
                    height: .23rem;
                    border-radius: 50%;
                }
                span{
                    padding-left: 1.2%;
                    font-size: .15rem;
                }
                i{
                    float: right;
                    font-size: .13rem;
                    color: #5b50d3;
                }
            }
            ul{
                li{
                    height: 1.41rem;
                    padding: 0 4.8%;
                    .left{
                        width: 1.1rem;
                        height: 1.1rem;
                        margin-top: .15rem;
                        float: left;
                        img{
                            width: 1.1rem;
                            height: 1.1rem;
                        }
                    }
                    .right{
                        float: right;
                        width: 60%;
                        height: 1.41rem;
                        .name{
                            font-size: .14rem;
                            margin-top: .12rem;
                            font-weight: bold;
                        }
                        .msg{
                            font-size: .13rem;
                            color: #666;
                            margin-top: .06rem;
                        }
                        .msg_{
                            font-size: .13rem;
                            color: #666;
                        }
                        .price{
                            font-size: .2rem;
                            color: #5b50d3;
                            font-weight: bold;
                            margin-top: .28rem;
                            display: inline-block;
                        }
                        .number{
                            float: right;
                            margin-top: .28rem;
                            font-size: .2rem;
                        }
                    }
                }
            }
            .add{
                height: .43rem;
                line-height: .43rem;
                border-bottom: 1px solid #ccc;
                background: #fff;
                font-size: .13rem;
                text-align: right;
                padding-right: 4.8%;
                i{
                    font-size: .15rem;
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
        width: 100%;
        height: 0.43rem;
        line-height: 0.43rem;
        border-bottom: 1px solid #ccc;
        background: #fff;
        font-size: 0.13rem;
        text-align: right;
        padding-right: 4.8%;
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
    }
  }
}

.active {
  border-bottom: 0.04rem solid #5b50d3;
  color: #5b50d3;
}
</style>


