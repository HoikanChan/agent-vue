<template>
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
</template>

<script>
export default {
  props: {
    item: {
      require: true,
      type: Object
    }
  }
}
</script>
