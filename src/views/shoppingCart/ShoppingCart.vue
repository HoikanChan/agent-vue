<template>
  <div class="shoppingcart">
    <x-header :left-options="{backText: ''}">购物车</x-header>
    <div class="editer">
      <img style="" src="../../assets/images/19.jpg" />
      <p>不问明天</p>
      <span v-if="flag" @click="editer">{{span}}</span>
    </div>
    <checker v-model="picked" default-item-class="demo2-item" selected-item-class="address-selected" radio-required>
      <checker-item v-for="(item,index) in products" :key="index" :value="item.id">
        <div class="address-detail">
          <div class="checkbox-wrapper">
            <label class="material-checkbox">
              <input type="checkbox">
              <span></span>
            </label>
          </div>
          <div>
            <p>好吃的可爱多
              <span>(10支/一盒)</span>
            </p>
            <p>产品信息
              <span>10支/一盒</span>
            </p>
            <p>乳液体</p>
            <p>￥990.00</p>
            <span class="number" v-if="nums">×12</span>
            <el-input-number size="mini" v-model="num" :min="1" v-if="!nums"></el-input-number>
          </div>
        </div>

      </checker-item>
    </checker>
    <!-- <ul class="order_list">
      <li>
        <div>
          <el-checkbox label=""></el-checkbox>
        </div>
        <div><img src="../../assets/images/8.jpg" /></div>
        <div>
          <p>好吃的可爱多
            <span>(10支/一盒)</span>
          </p>
          <p>产品信息
            <span>10支/一盒</span>
          </p>
          <p>乳液体</p>
          <p>￥990.00</p>
          <span class="number" v-if="nums">×12</span>
          <el-input-number size="mini" v-model="num" :min="1" v-if="!nums"></el-input-number>
        </div>
      </li>
      <li>
        <div>
          <el-checkbox label=""></el-checkbox>
        </div>
        <div><img src="../../assets/images/8.jpg" /></div>
        <div>
          <p>好吃的可爱多
            <span>(10支/一盒)</span>
          </p>
          <p>产品信息
            <span>10支/一盒</span>
          </p>
          <p>乳液体</p>
          <p>￥990.00</p>
          <span class="number" v-if="nums">×12</span>
          <el-input-number size="mini" v-model="num" :min="1" v-if="!nums"></el-input-number>
        </div>
      </li>
    </ul> -->
    <v-shopcart></v-shopcart>
  </div>
</template>
<script>
import ShopCart_Footer from 'components/public/ShopCart_Footer.vue'
import { XHeader, Checker, CheckerItem } from 'vux'
export default {
  components: {
    XHeader,
    Checker,
    CheckerItem,
    'v-shopcart': ShopCart_Footer
  },
  data() {
    return {
      picked: '',
      products: [
        {
          img: 'http://p0.meituan.net/600.600/deal/__38666717__4597520.jpg',
          title: '丰胸精油盒装（10支/一盒）',
          price: '900',
          info: '（10支/一盒）',
          category: '乳液体',
          amount: '1'
        },
        {
          img: 'http://p0.meituan.net/600.600/deal/__38666717__4597520.jpg',
          title: '丰胸精油盒装（10支/一盒）',
          price: '900',
          info: '（10支/一盒）',
          category: '乳液体',
          amount: '1'
        }
      ],
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
  }
}
</script>
<style lang="less" scoped>
</style>

<style>
@import url('../../assets/css/shoppingcart.css');
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
