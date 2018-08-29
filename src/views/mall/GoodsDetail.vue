<template>
  <div class="shoppingcart">
    <x-icon type="ios-arrow-back" size="30" class="back-icon" @click="$router.go(-1)"></x-icon>
    <x-icon type="more" size="30" class="more-icon"></x-icon>
    <swiper auto height="2.08rem" dots-class="custom-bottom" dots-position="center">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in images" :key="index"><img :src="item"></swiper-item>
    </swiper>
    <div class="goods_message">
      <p class="name">{{goodsDetail.goodsBrief}}
        <span>(10支/盒)</span>
      </p>
      <p class="num">已售</p>
      <span>{{goodsDetail.sellVolume?goodsDetail.sellVolume:0}}</span>
      <p class="num" style="padding-left:6.4%">库存</p>
      <span>{{goodsDetail.goodsNumber}}</span>
      <div style="display:flex;justify-content:space-between;">
        <p class="price">￥{{goodsDetail.memberPrice}}</p>
        <input-number size="mini" :value.sync="amount" :min="1"></input-number>
      </div>
    </div>
    <div class="specification">
      <p>规格
        <span>{{goodsDetail.goodsUnit?goodsDetail.goodsUnit:'暂无'}}</span>
      </p>
      <p>套盒
        <span>乳液体</span>
      </p>
    </div>
    <div class="goods_picture">
      <div class="topic_pic">产品详情</div>
      <div class="line"></div>
      <div class="goods-desc" v-html='goodsDetail.goodsDesc'></div>
    </div>
    <div class="goodsdetail_footer">
      <div><img src="../../assets/images/shoppingcart_.png" />
        <p>客服</p>
      </div>
      <div @click="$router.push({name:'shoppingCart'})"><img src="../../assets/images/shoppingcart_.png" />
        <p>购物车</p>
      </div>
      <div @click="addGoods()">加入购物车</div>
      <div @click="$router.push({name:'buy'})">立即购买</div>
    </div>
    <toast v-model="showToast" type="text" :time="800" is-show-mask text="添加成功" position="top" />
  </div>
</template>
<script>
import { XHeader, Swiper, SwiperItem, Toast } from 'vux'
import MallService from 'services/MallService'
import InputNumber from 'components/InputNumber'

export default {
  components: {
    XHeader,
    Swiper,
    SwiperItem,
    InputNumber,
    Toast
  },
  data() {
    return {
      msg: '商品详情',
      list: [],
      goodsDetail: '',
      amount: 1,
      product: {
        poiId: 3271694,
        title: '拉图牛排馆',
        price: 45
      },
      showToast: false,
      images: [
        'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
        'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
        'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
      ]
    }
  },
  methods: {
    addGoods() {
      this.$store.commit('addGoods', this.product)
      this.showToast = true
    }
  },
  async mounted() {
    const id = this.$route.params.id
    this.goodsDetail = (await MallService.getGoodsDetail(id)).data.info
  }
}
</script>
<style lang='less' scoped>
//todo:背景色没了
#app {
  background: #f8f8f8 !important;
}
.back-icon {
  position: absolute;
  z-index: 99;
  top: 12px;
  left: 12px;
}
.more-icon {
  top: 12px;
  right: 12px;
  position: absolute;
  z-index: 99;
}
@color_1: #fff;

.goodsdetail_footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.5rem;
  border-top: 1px solid #ccc;
  background: #fff;
  > div {
    img {
      width: 0.23rem;
      height: 0.22rem;
      margin-left: 30%;
      margin-top: 0.06rem;
    }
    p {
      text-align: center;
    }
    &:nth-child(1) {
      width: 20%;
      height: 0.5rem;
      float: left;
      border-right: 1px solid #ccc;
    }
    &:nth-child(2) {
      width: 20%;
      height: 0.5rem;
      float: left;
      border-right: 1px solid #ccc;
      border-right: none;
    }
    &:nth-child(3) {
      width: 29.8%;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      float: left;
      color: @color_1;
      background: #5b50d3;
      font-size: 0.16rem;
    }
    &:nth-child(4) {
      width: 29.8%;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      float: left;
      color: @color_1;
      background: #5b50d3;
      font-size: 0.16rem;
      background: #433aa2;
    }
  }
}
@color_2: #5b50d3;

.goods_message {
  width: 100%;
  height: 1.15rem;
  background: #fff;
  .name {
    height: 0.47rem;
    line-height: 0.47rem;
    font-size: 0.18rem;
    font-weight: 600;
    padding-left: 4.8%;
  }
  .num {
    margin-top: 0.14rem;
    font-weight: 600;
    font-size: 0.14rem;
    display: inline-block;
    padding-left: 4.8%;
  }
  span {
    font-weight: 600;
    font-size: 0.14rem;
  }
  .price {
    height: 0.35rem;
    line-height: 0.35rem;
    font-size: 0.2rem;
    font-weight: bold;
    padding-left: 4.8%;
    color: @color_2;
  }
}
.specification {
  height: 1.34rem;
  width: 100%;
  background: #fff;
  margin-top: 0.1rem;
  p {
    height: 0.32rem;
    line-height: 0.32rem;
    font-size: 0.13rem;
    font-weight: 600;
    padding-left: 4.8%;
    span {
      padding-left: 6.2%;
    }
  }
}
.goods_picture {
  width: 100%;
  height: 0.4rem;
  position: relative;
  .topic_pic {
    width: 22.6%;
    height: 0.4rem;
    text-align: center;
    background: #f8f8f8;
    line-height: 0.4rem;
    margin: 0 auto;
    font-size: 0.15rem;
    font-weight: 600;
  }
  .line {
    width: 50%;
    height: 0.01rem;
    background: #999;
    position: absolute;
    top: 50%;
    left: 25%;
    z-index: -1;
  }
  .goods-desc {
    padding: 0.2rem;
    margin-bottom: 0.5rem;
  }
}
</style>
