<template>
    <div class="all">
       
        <div class="goods">
           
                <div v-for="item in list">
                        <router-link :to="`/goodsdetail/${item.poiId}`">
                        <div class="good_img">
                            <img :src="item.frontImg"/>
                        </div>
                        <div class="good_name">{{item.title}}</div>
                        <div class="good_container">{{item.address}}</div>
                        <div class="good_price">￥<i>{{item.avgPrice}}</i></div>
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
      list: []
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
