<template>
  <div class="shoppingcart">
    <x-header :left-options="{backText: ''}">
      <span>购物车</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
    </x-header>
    <div class="editer" v-show="show">
      <img style="" :src="$store.getters.getUser.avatar" />
      <p>{{$store.getters.getUser.nickname || $store.getters.getUser.username}}</p>
      <span @click="toggleEdit">{{isEditing?"完成":"编辑"}}</span>
    </div>
    <div default-item-class="demo2-item" selected-item-class="selected" radio-required type="checkbox" v-if="!isEditing">
      <div v-for="(item,index) in products" :key="index" :value="item.id" @click="checkProduct(item)" :class="{selected:pickedIds.includes(item.id)}">
        <div class="detail">
          <div class="checkbox-wrapper">
            <label class="material-checkbox">
              <span>
              </span>
            </label>
          </div>
          <div><img :src="item.listPicUrl" /></div>
          <div>
            <p>{{item.goodsName}}
              <!-- <span>(10支/一盒)</span> -->
            </p>
            <p>产品规格
              <span>{{item.goodsSpecifitionNameValue}}</span>
            </p>
            <p></p>
            <div class="price-info">
              <p class="price">￥{{item.marketPrice}}</p>
              <span class="number" v-if="!isEditing">×{{item.number}}</span>
              <div v-else>
                <!-- <x-button mini type='warn' plain>删除</x-button> -->
                <input-number size="mini" :value.sync="item.number" :min="1"></input-number>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  default-item-class="demo2-item" selected-item-class="selected" radio-required type="checkbox" v-else>
      <div v-for="(item,index) in products" :key="index" :value="item.id" @click="deleteItem(item)" :class="{selected:deleteIds.includes(item.id)}">
        <div class="detail">
          <div class="checkbox-wrapper">
            <label class="material-checkbox">
              <span>
              </span>
            </label>
          </div>
          <div><img :src="item.listPicUrl" /></div>
          <div>
            <p>{{item.goodsName}}
              <!-- <span>(10支/一盒)</span> -->
            </p>
            <p>产品规格
              <span>{{item.goodsSpecifitionNameValue}}</span>
            </p>
            <p></p>
            <div class="price-info">
              <p class="price">￥{{item.marketPrice}}</p>
              <span class="number" v-if="!isEditing">×{{item.number}}</span>
              <div v-else>
                <!-- <x-button mini type='warn' plain>删除</x-button> -->
                <input-number size="mini" :value.sync="item.number" :min="1"></input-number>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shopcart_footer " v-show="show">
      <material-checkbox class="checkbox " :value.sync="chooseAll" @click.native.stop="doChooseAll()" v-if="!isEditing">全选</material-checkbox>
      <div class="close_price " @click="checkout ">{{isEditing?'删除':'结算'}}</div>
      <div class="price_all ">
        <p>消耗积分：￥
          <span>{{total.checkedGoodsAmount}}</span>
        </p>
        <p>不含运费</p>
      </div>
    </div>
    <div class="nothings" v-if="products.length === 0">
      <img src="../../assets/images/noshoppings.png" />
      <p>你的购物车没有商品</p>
      <p>赶快去挑选吧！</p>
      <div @click="$router.push({name:'mall'})">去挑选</div>
    </div>
  </div>
</template>
<script>
import { XHeader, XButton, Checker, CheckerItem, debounce } from 'vux'
import Checkbox from 'components/Checkbox'
import InputNumber from 'components/InputNumber'
import ShoppingCartService from 'services/ShoppingCartService'

export default {
  components: {
    XHeader,
    XButton,
    Checker,
    CheckerItem,
    InputNumber,
    'material-checkbox': Checkbox
  },
  data() {
    return {
      pickedIds: [],
      chooseAll: false,
      deletAll: false,
      deleteIds: [],
      products: [],
      checked: true,
      isEditing: false,
      num: 1,
      flag: false,
      total: {},
      show: false
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
      this.pickedIds = []
      const result = await ShoppingCartService.get()
      this.total = result.cartTotal
      this.products = result.cartList ? result.cartList : []
      if (this.products.length) {
        this.products.forEach(product => {
          if (product.checked) {
            this.pickedIds.push(product.id)
          }
        })
        this.show = true
      } else {
        this.show = false
      }
      this.adjustChooseAll()
    },
    async toggleEdit() {
      if (this.isEditing === true) {
        await Promise.all(
          this.products.map(async item => {
            return await ShoppingCartService.update({
              cartId: item.id,
              goodsId: item.goodsId,
              productId: item.productId,
              number: item.number
            })
          })
        )
        this.updateCart()
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
    deleteItem: function(item) {
      if (this.deleteIds.includes(item.id)) {
        this.deleteIds = this.deleteIds.filter(id => id !== item.id)
      } else {
        this.deleteIds.push(item.id)
      }
    },
    checkProduct: function(item) {
      if (this.flag) return
      this.flag = true
      if (this.pickedIds.includes(item.id)) {
        this.pickedIds = this.pickedIds.filter(id => id !== item.id)
      } else {
        this.pickedIds.push(item.id)
      }
      this.adjustChooseAll()
      //点击的商品当前是否选中
      setTimeout(async () => {
        const isChecked = this.pickedIds.includes(item.id)
        const result = (await ShoppingCartService.check(item.id, isChecked))
          .data
        this.total = result.cartTotal
      }, 100)
      this.flag = false
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
    //点击全选选择所有项目
    async doDeleteAll() {
      if (this.flag) return
      this.flag = true
      if (this.chooseAll === true) {
        this.deleteIds = productIds
      } else {
        this.deleteIds = []
      }
      this.updateCart()
      this.flag = false
    },
    async checkout() {
      if (this.isEditing) {
        await ShoppingCartService.delete(this.deleteIds)
        this.updateCart()
      } else {
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
        console.log(result)
        this.$store.dispatch('setBill', result.data)
        this.$vux.loading.hide()
        this.$router.push({ name: 'buy' })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/css/shoppingcart.css');

@color_1: #666;
@color_2: #5b50d3;
.vux-checker-item {
  width: 100%;
}
.vux-header {
  border-bottom: 1px solid #eee !important;
}
.detail {
  padding: 0 0.2rem 0 0.2rem;
  border-top: 1px solid #eee;
  background: #fff;
  display: flex;
  align-items: center;
  > div {
    &:nth-child(2) {
      width: 0.9rem;
      height: 0.9rem;
      margin-left: 4%;
      img {
        width: 100%;
        height: 100%;
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
          margin-top: 0.12rem;
        }
        .number {
          font-size: 0.18rem;
          color: @color_1;
          font-weight: bold;
          padding-right: 7.8%;
          margin-top: 0.12rem;
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
  width: 96%;
  height: 0.5rem;
  background: #fff;
  position: fixed;
  bottom: 0.51rem;
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
.nothings {
  text-align: center;
  img {
    width: 1.58rem;
    height: auto;
    margin-top: 1.08rem;
  }
  p {
    font-size: 0.15rem;
    color: #9890ec;
    &:nth-child(2) {
      margin-top: 0.13rem;
    }
  }
  div {
    display: block;
    width: 90.6%;
    height: 0.38rem;
    line-height: 0.38rem;
    color: #fff;
    font-size: 0.15rem;
    border-radius: 0.02rem;
    margin: 1.05rem auto;
    text-align: center;
    background: #5b50d3;
  }
}
.vux-header {
  border-bottom: 1px solid #ccc;
}
.shoppingcart {
  .input-number-decrement,
  .input-number-increment {
    width: 20px !important;
    border-radius: 0 !important;
  }
}
@color_5: rgba(0, 0, 0, 0.87);
@font_family_1: 'Roboto', 'Segoe UI', BlinkMacSystemFont, system-ui,
  -apple-system;
@background_color_1: rgba(0, 0, 0, 0.2) !important;
@background_color_2: #5b50d3;
@background_color_3: rgba(0, 0, 0, 0.26);
@border_color_1: #5b50d3;
@border_color_2: transparent;
@border_color_3: rgba(0, 0, 0, 0.26);
@border_color_4: #fff;

.material-checkbox {
  position: relative;
  display: inline-block;
  color: @color_5;
  cursor: pointer;
  font-family: @font_family_1;
  font-size: 14px;
  line-height: 18px;
  > input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    position: absolute;
    z-index: -1;
    left: -15px;
    top: -15px;
    display: block;
    margin: 0;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    background-color: @background_color_1;
    outline: none;
    opacity: 0;
    transform: scale(1);
    -ms-transform: scale(0);
    transition: opacity 0.5s, transform 0.5s;
    &:disabled {
      opacity: 0;
      & + span {
        cursor: initial;
        &::before {
          border-color: @border_color_3;
        }
      }
    }
  }
  > span {
    &::before {
      content: '';
      display: inline-block;
      margin-right: 8px;
      border: solid 2px rgba(0, 0, 0, 0.2) !important;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      vertical-align: -4px;
      transition: border-color 0.5s, background-color 0.5s;
    }
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 1px;
      left: 2px;
      width: 6px;
      height: 13px;
      border: solid 2px transparent;
      border-left: none;
      border-top: none;
      transform: translate(5.5px, 1px) rotate(45deg);
      -ms-transform: translate(5.5px, 2px) rotate(45deg);
    }
  }
}
.selected {
  span {
    &::before {
      border-color: @border_color_1;
      background-color: @background_color_2;
      border-color: @border_color_1;
    }
    &::after {
      border-color: @border_color_4;
    }
  }
}
</style>
