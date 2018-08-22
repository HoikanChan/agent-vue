<template>
  <div class="all">
    <div class="goods">
      <div v-for="(item,index) in list" :key="index">
        <router-link :to="`/goodsdetail/${item.poiId}`">
          <div class="good_img">
            <img :src="item.frontImg" />
          </div>
          <div class="good_name">{{item.title}}</div>
          <div class="good_container">{{item.address}}</div>
          <div class="good_price">￥
            <i>{{item.avgPrice}}</i>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      title: '全部',
      list: [
        {
          poiId: 3271694,
          frontImg:
            'http://p0.meituan.net/600.600/deal/__38666717__4597520.jpg',
          title: '拉图牛排馆',
          avgScore: 3.9,
          allCommentNum: 3561,
          address: '北站/建设路建设路35-1号后座（金城广场斜对面）',
          avgPrice: 45,
          dealList: []
        }
      ]
    }
  },
  methods: {
    godetail() {}
  },
  mounted() {
    axios
      .get('data.json')
      .then(response => {
        this.list = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
<style>
@import url('../../assets/css/all.css');
.good_price i {
  font-weight: bold;
  font-size: 0.14rem;
}
</style>
