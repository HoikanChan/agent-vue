<template>
  <router-link :to="`/goodsdetail/${item.id}`">
    <div class="good_img">
      <img :src="item.primaryPicUrl" />
    </div>
    <div class="good_name">{{item.goodsName}}</div>
    <!-- <div class="good_container">{{item.address}}</div> -->
    <div class="good_price" style="text-decoration:line-through;">零售价：￥
      <i>{{item.retailPrice}}</i>
    </div>
    <div class="good_price">会员价：
      <i>￥{{item.memberPrice}}</i>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    item: {
      require: true,
      type: Object
    }
  }
}
</script>
