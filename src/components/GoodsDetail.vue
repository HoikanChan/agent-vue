<template>
    <div class="shoppingcart">
        <div class="swiper-container">
		  <div class="swiper-wrapper">
		    <div class="swiper-slide"><img src="../assets/images/1.jpg" /></div>
		    <div class="swiper-slide"><img src="../assets/images/2.jpg" /></div>
		    <div class="swiper-slide"><img src="../assets/images/3.jpg" /></div>
			<div class="swiper-slide"><img src="../assets/images/4.jpg" /></div>
			<div class="swiper-slide"><img src="../assets/images/5.jpg" /></div>
		  </div>
		  <div class="swiper-pagination"></div>
		</div>
        <div class="goods_message">
            <p class="name">{{list.title}}<span>(10支/盒)</span></p>
            <p class="num">已售</p><span>0</span><p class="num" style="padding-left:6.4%">库存</p><span>555</span>
            <p class="price">￥990.00</p>
            <group>
            <x-number title="" v-model="value"></x-number>
            </group>
        </div>
        <div class="specification">
            <p>规格<span>10支/一盒</span></p>
            <p>套盒<span>乳液体</span></p>
            
        </div>
        <div class="goods_picture">
            <div class="topic_pic">产品详情</div>
            <div class="line"></div>
        </div>
        
        <v-goodsfooter></v-goodsfooter>
    </div>
</template>
<script>
import { XNumber } from 'vux'
import GoodsDetail_Footer from './public/GoodsDetail_Footer.vue'
import Swiper from 'swiper'
import '../../node_modules/swiper/dist/css/swiper.css'
import axios from 'axios'
export default {
  data() {
    return {
      msg: '商品详情',
      list: []
    }
  },
  mounted() {
    var mySwiper = new Swiper('.swiper-container', {
      //autoplay: true,//可选选项，自动滑动
      autoplay: {
        delay: 1000 //1秒切换一次
      },
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      }
    })

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
  },
  components: {
    XNumber,
    'v-goodsfooter': GoodsDetail_Footer
  }
}
</script>
<style scoped>
@import url('../assets/css/goodsdetail.css');
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
.weui-cell__ft{
  position: absolute;
  left: 0;
  top: 0;
}
</style>
