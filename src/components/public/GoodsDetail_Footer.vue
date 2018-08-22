<template>
    <div class="goodsdetail_footer">
        <div><img src="../../assets/images/shoppingcart_.png" /><p>客服</p></div>
        <div><img src="../../assets/images/shoppingcart_.png" /><p>购物车</p></div>
        <div>加入购物车</div>
        <div>立即购买</div>
    </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style scoped>
.goodsdetail_footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.5rem;
  border-top: 1px solid #ccc;
  background: #fff;
}
.goodsdetail_footer > div img {
  width: 0.23rem;
  height: 0.22rem;
  margin-left: 30%;
  margin-top: 0.06rem;
}
.goodsdetail_footer > div p {
  text-align: center;
}
.goodsdetail_footer > div:nth-child(1),
.goodsdetail_footer > div:nth-child(2) {
  width: 20%;
  height: 0.5rem;
  float: left;
  border-right: 1px solid #ccc;
}
.goodsdetail_footer > div:nth-child(2) {
  border-right: none;
}
.goodsdetail_footer > div:nth-child(3),
.goodsdetail_footer > div:nth-child(4) {
  width: 29.8%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  float: left;
  color: #fff;
  background: #5b50d3;
  font-size: 0.16rem;
}
.goodsdetail_footer > div:nth-child(4) {
  background: #433aa2;
}
</style>
