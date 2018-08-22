<template>
    <div class="shoppingcart">
        <div class="shoppingcart_top">购物车</div>
        <div class="editer">
            <img style="" src="../assets/images/19.jpg" />
            <p>不问明天</p>
            <span v-if="flag" @click="editer">{{span}}</span>
        </div>
        <ul class="order_list">
            <li>
                <div><el-checkbox label=""></el-checkbox></div>
                <div><img src="../assets/images/8.jpg" /></div>
                <div>
                    <p>好吃的可爱多<span>(10支/一盒)</span></p>
                    <p>产品信息<span>10支/一盒</span></p>
                    <p>乳液体</p>
                    <p>￥990.00</p><span class="number"  v-if="nums">×12</span>
                    <el-input-number size="mini" v-model="num" :min="1" v-if="!nums"></el-input-number>
                </div>
            </li>
            <li>
                <div><el-checkbox label=""></el-checkbox></div>
                <div><img src="../assets/images/8.jpg" /></div>
                <div>
                    <p>好吃的可爱多<span>(10支/一盒)</span></p>
                    <p>产品信息<span>10支/一盒</span></p>
                    <p>乳液体</p>
                    <p>￥990.00</p><span class="number"  v-if="nums">×12</span>
                    <el-input-number size="mini" v-model="num" :min="1" v-if="!nums"></el-input-number>
                </div>
            </li>
        </ul>
        


        <v-shopcart></v-shopcart>
        <v-footer></v-footer>
    </div>
</template>
<script>
import Footer from './public/Footer.vue'
import ShopCart_Footer from './public/ShopCart_Footer.vue'
import { Checklist } from 'mint-ui'
export default {
  data() {
    return {
      msg: '购物车',
      checked: true,
      span: '编辑',
      flag: true,
      nums: true,
      num: 1
    }
  },
  methods: {
    checkon: function() {
      console.log(this.value)
    },
    handleChange(value) {
      console.log(value)
    },
    editer() {
      this.flag = !this.flag
      this.nums = !this.nums
      if (this.flag == true) {
        this.span = '编辑'
      } else if (this.flag == false) {
        this.span = '完成'
      }
    }
  },
  components: {
    'v-footer': Footer,
    'v-shopcart': ShopCart_Footer
  }
}
</script>
<style>
@import url('../../node_modules/element-ui/lib/theme-chalk/checkbox.css');
@import url('../../node_modules/element-ui/lib/theme-chalk/input-number.css');
@import url('../../node_modules/element-ui/lib/theme-chalk/step.css');
@import url('../../node_modules/element-ui/lib/theme-chalk/input.css');
@import url('../assets/css/shoppingcart.css');
.el-input-number--mini {
  width: 60px;
  line-height: 26px;
  float: right;
}
.el-input-number--mini .el-input-number__decrease,
.el-input-number--mini .el-input-number__increase {
  width: 18px;
  font-size: 12px;
}
.el-input-number__decrease,
.el-input-number__increase {
  height: 0.24rem;
}
.el-input-number--mini .el-input__inner {
  padding-left: 0px;
  padding-right: 0px;
}
.el-input--mini .el-input__inner {
  height: 26px;
  line-height: 26px;
}
.el-input-number {
  top: 0.12rem;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #5b50d3;
  border-color: #5b50d3;
}
.el-checkbox__inner {
  width: 0.21rem;
  height: 0.21rem;
  border-radius: 50%;
  border: 1px solid #999;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #000;
}
</style>
