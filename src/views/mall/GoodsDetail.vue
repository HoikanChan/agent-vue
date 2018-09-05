<template>
  <div class="goods-detail">
    <x-icon type="ios-arrow-back" size="30" class="back-icon" @click="$router.go(-1)"></x-icon>
    <x-icon type="more" size="30" class="more-icon"></x-icon>
    <swiper auto height="2.08rem" dots-class="custom-bottom" dots-position="center">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in images" :key="index"><img :src="item"></swiper-item>
    </swiper>
    <div class="goods_message">
      <p class="name">{{goodsDetail.goodsBrief}}
        <!-- <span>(10支/盒)</span> -->
      </p>
      <p class="num">已售</p>
      <span>{{goodsDetail.sellVolume?goodsDetail.sellVolume:0}}</span>
      <p class="num" style="padding-left:6.4%">库存</p>
      <span>{{pickedProduct?pickedProduct.goodsNumber:goodsDetail.goodsNumber}}</span>
      <div style="display:flex;justify-content:space-between;">
        <p class="price">￥{{Number(pickedProduct?pickedProduct.price:goodsDetail.memberPrice)*amount | numFilter}}</p>
        <input-number size="mini" :value.sync="amount" :min="1"></input-number>
      </div>
    </div>
    <div class="specification" v-if="productList.length">
      <p>规格
      </p>
      <div class="spec-select">
        <p v-for="(spec,index) in specificationList" :key="index">
          <span>选择{{spec.name}}</span>
          <checker v-model="pickedSpec[index]" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
            <checker-item :value="val.id" v-for="val in spec.valueList" :disabled="val.disabled" :key="val.id" style="margin-right:1em;">{{val.value}}</checker-item>
          </checker>
          <!-- <span>{{goodsDetail.goodsUnit?goodsDetail.goodsUnit:'暂无'}}</span> -->
        </p>
      </div>
      <!-- <p>套盒
        <span>乳液体</span>
      </p> -->
    </div>
    <div class="goods_picture">
      <div class="topic_pic">产品详情</div>
      <div class="line"></div>
      <div class="goods-desc" v-html='goodsDetail.goodsDesc'></div>
    </div>
    <div class="goodsdetail_footer">
      <div><img style="margin-left:36%;" src="../../assets/images/service.png" />
        <p>客服</p>
      </div>
      <div @click="$router.push({name:'shoppingCart'})"><img src="../../assets/images/shoppingcart_.png" />
        <p>购物车</p>
      </div>
      <div @click="addGoods()">加入购物车</div>
      <div @click="$router.push({name:'buy'})">立即购买</div>
    </div>
    <toast v-model="showToast" type="text" :time="800" is-show-mask text="请先选择规格" position="top" width='10em' />
  </div>
</template>
<script>
import { XHeader, Swiper, SwiperItem, Toast, Checker, CheckerItem } from 'vux'
import MallService from 'services/MallService'
import ShoppingCartService from 'services/ShoppingCartService'
import InputNumber from 'components/InputNumber'

export default {
  components: {
    XHeader,
    Swiper,
    SwiperItem,
    InputNumber,
    Toast,
    Checker,
    CheckerItem
  },
  data() {
    return {
      msg: '商品详情',
      list: [],
      goodsDetail: '',
      specificationList: [],
      pickedSpec: [],
      productList: [],
      amount: 1,
      demo1: '',
      product: {
        poiId: 3271694,
        title: '拉图牛排馆',
        price: 45
      },
      showToast: false,
      images: []
    }
  },
  methods: {
    async addGoods() {
      if (this.pickedProduct) {
        const result = await ShoppingCartService.add({
          goodsId: this.goodsDetail.id,
          productId: this.pickedProduct.productId,
          number: this.amount
        })
        this.$vux.toast.show({
          width: '10em',
          type: result.errno ? 'warn' : 'success',
          text: result.errmsg
        })
      } else {
        this.showToast = true
      }
    }
  },
  computed: {
    pickedProduct: function() {
      if (this.pickedSpec.some(i => i === '')) {
        return null
      }
      return this.productList.find(
        i => JSON.stringify(i.specIds) === JSON.stringify(this.pickedSpec)
      )
    }
  },
  watch: {
    pickedSpec: {
      handler: function(newValue, oldValue) {
        //js中数组是否包含另一个数组检测的方法
        const isContained = (a, b) => {
          if (!(a instanceof Array) || !(b instanceof Array)) return false
          if (a.length < b.length) return false
          var aStr = a.toString()
          for (var i = 0, len = b.length; i < len; i++) {
            if (aStr.indexOf(b[i]) == -1) return false
          }
          return true
        }
        newValue.forEach((newVal, index) => {
          for (let i = 0; i < this.specificationList.length; i++) {
            if (i !== index) {
              for (let val of this.specificationList[i].valueList) {
                const hasThisSpec = this.productList.some(item => {
                  return isContained(item.specIds, [val.id, newVal])
                })
                val.disabled = !hasThisSpec
              }
            }
          }
        })
      },
      deep: true
    }
  },
  async activated() {
    this.specificationList = []
    this.pickedSpec = []
    this.productList = []
    const id = this.$route.params.id
    const result = (await MallService.getGoodsDetail(id)).data
    if (!result) {
      return
    }
    this.goodsDetail = result.info
    this.images = this.goodsDetail
      ? this.goodsDetail.goodsImgList.map(i => i.imgUrl)
      : []
    //可选规格组合
    this.productList = result.productList.map(i => {
      return {
        goodsNumber: i.goodsNumber,
        price: i.memberPrice,
        productId: i.id,
        specIds: i.goodsSpecificationIds
          .split('_')
          .map(i => Number(i))
          .reverse()
      }
    })
    if (this.productList.length) {
      //初始化，选择规格
      this.pickedSpec = this.productList[0].specIds.slice()
    }
    //所有规格
    this.specificationList = result.specificationList
    for (let spec of this.specificationList) {
      for (let val of spec.valueList) {
        const hasThisSpec = this.productList.some(item => {
          return item.specIds.includes(val.id)
        })
        if (!hasThisSpec) {
          val.disabled = true
        }
      }
    }
  }
}
</script>
<style lang='less' scoped>
img {
  width: 100%;
  height: auto;
}
.demo1-item {
  border: 1px solid #ececec;
  color: #aaa;
  padding: 5px 15px;
  cursor: not-allowed;
}
.demo1-item-selected {
  border: 2px solid green !important;
  margin: -1px;
}
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
  width: 100%;
  background: #fff;
  padding: 1em 0;
  margin-top: 0.1rem;
  .spec-select {
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1em;
    }
    margin: 1em 2em 3em;
  }
  > p {
    // height: 0.32rem;
    // // line-height: 0.32rem;
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
<style lang="less">
.goods-detail {
  .vux-tap-active {
    border: 1px solid #aaa;
    color: #333 !important;
  }
}
</style>
