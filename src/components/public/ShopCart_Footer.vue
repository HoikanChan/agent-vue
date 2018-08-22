<template>
    <div class="shopcart_footer">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div class="close_price">结算</div>
        <div class="price_all">
            <p>消耗积分：￥<span>0.00</span></p>
            <p>不含运费</p>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      checkAll: false,
      isIndeterminate: false
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}
</script>
<style>
.shopcart_footer {
  width: 100%;
  height: 0.5rem;
  background: #fff;
  position: fixed;
  bottom: 0.47rem;
  padding-left: 4%;
}
.shopcart_footer .el-checkbox__inner {
  margin-top: 0rem;
  margin-left: 4%;
}
.shopcart_footer .el-checkbox__label {
  font-size: 12px;
  color: #000;
  font-weight: bold;
  margin-top: 0.19rem;
}
.shopcart_footer .close_price {
  width: 30.6%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  background: #5b50d3;
  float: right;
  color: #fff;
  font-size: 0.16rem;
}
.shopcart_footer .price_all {
  width: 40%;
  height: 0.5rem;
  float: right;
  font-size: 0.12rem;
  font-weight: bold;
}
.shopcart_footer .price_all p:first-child {
  margin-top: 0.08rem;
}
</style>
