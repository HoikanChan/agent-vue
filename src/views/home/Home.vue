<template>
  <div class="home">
    <swiper auto height="2rem" dots-class="custom-bottom" dots-position="center">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in images" :key="index"><img :src="item.imageUrl"></swiper-item>
    </swiper>
    <div class="nav">
      <div @click="$router.push({name:'myteam'})"><img src='../../assets/images/team.png' />
        <p>我的团队</p>
      </div>
      <div @click="$router.push({name:'mypoints'})"><img src='../../assets/images/points.png' />
        <p>我的积分</p>
      </div>
      <div><img src='../../assets/images/authorising.png' />
        <p>我的授权书</p>
      </div>
      <!-- <div><img src='../../assets/images/cash.png' />
        <p>我的押金</p>
      </div> -->
      <div @click="$router.push({name:'teamcash'})"><img src='../../assets/images/grade.png' />
        <p>我的业绩</p>
      </div>
      <div>其他</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { Swiper, SwiperItem } from 'vux'
import { host } from 'services/Api'
export default {
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      images: [],
      title: '首页内容'
    }
  },
  mounted() {
    axios.get(host + 'adv/index').then(response => {
      // console.log(response)
      this.images = response.data.data
    })
  }
}
</script>
<style scoped>
img {
  width: 100%;
  height: auto;
}
.nav {
  width: 100%;
  height: 3.95rem;
  padding-bottom: 3.4em;
}
.nav div {
  display: block;
  width: 44.6%;
  height: 1.14rem;
  margin-top: 0.1rem;
  font-size: 0.18rem;
  color: #fff;
  text-align: center;
}
.nav div p {
  display: block;
  height: 0.16rem;
  margin-top: 0.07rem;
}
.nav div:nth-child(2n-1) {
  float: left;
  margin-left: 3.6%;
}
.nav div:nth-child(2n) {
  float: right;
  margin-right: 3.6%;
}
.nav div:nth-child(1) {
  background: #8c82ff;
}
.nav div:nth-child(1) img {
  display: block;
  width: 0.43rem;
  height: 0.35rem;
  margin-left: 36.3%;
  margin-top: 0.27rem;
}
.nav div:nth-child(2) img {
  display: block;
  width: 0.4rem;
  height: 0.39rem;
  margin-left: 37.5%;
  margin-top: 0.24rem;
}
.nav div:nth-child(3) img {
  display: block;
  width: 0.43rem;
  height: 0.35rem;
  margin-left: 39.4%;
  margin-top: 0.27rem;
}
/* .nav div:nth-child(4) img {
  display: block;
  width: 0.32rem;
  height: 0.37rem;
  margin-left: 40%;
  margin-top: 0.26rem;
} */
.nav div:nth-child(4) img {
  display: block;
  width: 0.4rem;
  height: 0.35rem;
  margin-left: 37.8%;
  margin-top: 0.27rem;
}
.nav div:nth-child(5) {
  line-height: 1.14rem;
}
.nav div:nth-child(2) {
  background: #ff6267;
}
.nav div:nth-child(3) {
  background: #48d0f2;
}
.nav div:nth-child(4) {
  background: #ff9655;
}
.nav div:nth-child(5) {
  background: #c38eff;
}
.nav div:nth-child(6) {
  background: #ff7fb0;
}
.swiper-pagination-bullet {
  width: 12px;
  height: 3px;
  display: inline-block;
  border-radius: 0;
  background: #fff;
  box-shadow: 2px 2px 2px grey;
}
.swiper-pagination-bullet-active {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 2px #fff solid;
  background-color: #ccc;
  opacity: 1;
  box-shadow: 2px 2px 2px grey;
}
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 8px;
}
</style>
