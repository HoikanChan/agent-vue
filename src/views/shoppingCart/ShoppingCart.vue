<template>
  <div class="shoppingcart">
    <x-header :left-options="{backText: ''}">购物车</x-header>
    <div class="editer">
      <img style="" src="../../assets/images/19.jpg" />
      <p>不问明天</p>
      <span @click="toggleEdit">{{isEditing?"完成":"编辑"}}</span>
    </div>
    <checker v-model="pickedIds" default-item-class="demo2-item" selected-item-class="selected" radio-required type="checkbox">
      <checker-item v-for="(item,index) in products" :key="index" :value="item.id" @click.native.stop="checkProduct(item)">
        <div class="detail">
          <div class="checkbox-wrapper">
            <material-checkbox></material-checkbox>
          </div>
          <div><img :src="item.listPicUrl" /></div>
          <div>
            <p>{{item.goodsName}}
              <span>(10支/一盒)</span>
            </p>
            <p>产品规格
              <span>{{item.goodsSpecifitionNameValue}}</span>
            </p>
            <p></p>
            <div class="price-info">
              <p class="price">￥{{item.retailPrice}}</p>
              <span class="number" v-if="!isEditing">×{{item.number}}</span>
              <input-number size="mini" :value.sync="item.number" :min="1" v-else></input-number>
            </div>
          </div>
        </div>
      </checker-item>
    </checker>
    <div class="shopcart_footer ">
      <material-checkbox class="checkbox " :value.sync="chooseAll" @click.native.stop="doChooseAll()">全选</material-checkbox>
      <div class="close_price " @click="checkout ">结算</div>
      <div class="price_all ">
        <p>消耗积分：￥
          <span>{{total.checkedGoodsAmount}}</span>
        </p>
        <p>不含运费</p>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader, Checker, CheckerItem } from 'vux'
import Checkbox from 'components/Checkbox'
import InputNumber from 'components/InputNumber'
import ShoppingCartService from 'services/ShoppingCartService'

export default {
  components: {
    XHeader,
    Checker,
    CheckerItem,
    InputNumber,
    'material-checkbox': Checkbox
  },
  data() {
    return {
      pickedIds: [],
      chooseAll: false,
      products: [],
      checked: true,
      isEditing: false,
      num: 1,
      flag: false,
      total: {}
    }
  },
  computed: {
    productIds: function() {
      return this.products.map(item => item.id)
    }
  },
  async mounted() {
    this.updateCart()
  },
  methods: {
    async updateCart() {
      const result = await ShoppingCartService.get()
      this.total = result.cartTotal
      this.products = result.cartList ? result.cartList : []
      if (this.products.length) {
        this.products.forEach(product => {
          if (product.checked) {
            this.pickedIds.push(product.id)
          }
        })
        this.adjustChooseAll()
      }
    },
    toggleEdit() {
      if (this.isEditing) {
        this.products.map(product => Sh)
      }
      this.isEditing = !this.isEditing
    },
    //点击子项，更新全选状态
    adjustChooseAll() {
      if (
        JSON.stringify(this.pickedIds.slice().sort()) ===
        JSON.stringify(this.productIds.sort())
      ) {
        this.chooseAll = true
      } else {
        this.chooseAll = false
      }
    },
    checkProduct(item) {
      this.adjustChooseAll()
      //点击的商品当前是否选中
      const isChecked = this.pickedIds.includes(item.id)
      ShoppingCartService.check(item.id, isChecked)
    },
    //点击全选选择所有项目
    async doChooseAll() {
      if (this.flag) return
      this.flag = true
      if (this.chooseAll === true) {
        await ShoppingCartService.check(this.productIds, true)
      } else {
        this.pickedIds = []
        await ShoppingCartService.check(this.productIds, false)
      }
      this.updateCart()
      this.flag = false
    },
    async checkout() {
      if (!this.pickedIds.length) {
        this.$vux.toast.show({
          width: '10em',
          type: 'warn',
          text: '请先选择商品'
        })
        return
      }
      this.$vux.loading.show({
        text: 'Loading'
      })
      const result = await ShoppingCartService.checkout()
      this.$store.dispatch('setBill', result.data)
      this.$vux.loading.hide()
      this.$router.push({ name: 'buy' })
    }
  }
}
</script>
<style lang="less" scoped>
@color_1: #666;
@color_2: #5b50d3;

@color_1: #666;
@color_2: #5b50d3;
.vux-checker-item {
  width: 100%;
}
.detail {
  padding: 0 0.2rem 0 0.2rem;
  border-bottom: 1px solid #ccc;
  background: #fff;
  display: flex;
  align-items: center;
  > div {
    &:nth-child(2) {
      width: 0.9rem;
      height: 0.9rem;
      margin-left: 4%;
      margin-top: 0.15rem;
      img {
        width: 100%;
        height: auto;
      }
      p {
        &:nth-child(3) {
          height: 0.17rem;
          color: @color_1;
          font-size: 0.12rem;
        }
      }
    }
    &:nth-child(3) {
      flex: 1 1 auto;
      height: 1rem;
      margin-top: 0.15rem;
      .price-info {
        display: flex;
        justify-content: space-between;
        margin-top: 0.16rem;

        .price {
          font-size: 0.18rem;
          display: inline-block;
          white-space: nowrap;
          color: @color_2;
        }
        .number {
          font-size: 0.18rem;
          color: @color_1;
          font-weight: bold;
          padding-right: 7.8%;
        }
      }
      p {
        font-size: 0.13rem;
        font-weight: bold;
        padding-left: 5.2%;
        &:nth-child(1) {
          span {
            padding-left: 4.2%;
          }
        }
        &:nth-child(2) {
          margin-top: 0.04rem;
          height: 0.17rem;
          color: @color_1;
          font-size: 0.12rem;
          span {
            padding-left: 8.4%;
          }
        }
      }
    }
  }
}

.shopcart_footer {
  width: 100%;
  height: 0.5rem;
  background: #fff;
  position: fixed;
  bottom: 0.47rem;
  padding-left: 4%;
  .checkbox {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .close_price {
    width: 30.6%;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    background: #5b50d3;
    float: right;
    color: #fff;
    font-size: 0.16rem;
  }
  .price_all {
    width: 40%;
    height: 0.5rem;
    float: right;
    font-size: 0.12rem;
    font-weight: bold;
    p {
      &:first-child {
        margin-top: 0.08rem;
      }
    }
  }
}
</style>

<style>
@import url('../../assets/css/shoppingcart.css');
</style>
