<template>
  <div class="shoppingcart">
    <x-icon type="ios-arrow-back" size="30" class="back-icon" @click="$router.go(-1)"></x-icon>
    <x-icon type="more" size="30" class="more-icon"></x-icon>
    <swiper auto height="2.08rem" dots-class="custom-bottom" dots-position="center">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in images" :key="index"><img :src="item"></swiper-item>
    </swiper>
    <div class="goods_message">
      <p class="name">{{list.title}}
        <span>(10支/盒)</span>
      </p>
      <p class="num">已售</p>
      <span>0</span>
      <p class="num" style="padding-left:6.4%">库存</p>
      <span>555</span>
      <p class="price">￥990.00</p>
    </div>
    <div class="specification">
      <p>规格
        <span>10支/一盒</span>
      </p>
      <p>套盒
        <span>乳液体</span>
      </p>
    </div>
    <div class="goods_picture">
      <div class="topic_pic">产品详情</div>
      <div class="line"></div>
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
import axios from 'axios'
import { XHeader, Swiper, SwiperItem, Toast } from 'vux'

export default {
  components: {
    XHeader,
    Swiper,
    SwiperItem,
    Toast
  },
  data() {
    return {
      msg: '商品详情',
      list: [],
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
  mounted() {
    var poiId = this.$route.params.poiId
    axios
      .get('detail.json?a=1&poiId=' + poiId)
      .then(response => {
        console.log(response)
        this.list = response.data[0]
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
<style lang='less' scoped>
@import url('../../assets/css/goodsdetail.css');
.swiper-container {
  height: 2.08rem;
  width: 100%;
}
.swiper-slide {
  height: 100%;
  width: 100%;
}
.swiper-slide img {
  width: 100%;
  height: auto;
}
.back-icon {
  position: fixed;
  z-index: 99;
  top: 12px;
  left: 12px;
}
.more-icon {
  top: 12px;
  right: 12px;
  position: fixed;
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
</style>
