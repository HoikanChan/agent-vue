<template>
  <div class="shoppingcart">
    <x-header :left-options="{backText: ''}">购物车</x-header>
    <div class="editer">
      <img style="" src="../../assets/images/19.jpg" />
      <p>不问明天</p>
      <span @click="this.isEditing = !this.isEditing">{{isEditing?"完成":"编辑"}}</span>
    </div>
    <checker v-model="picked" default-item-class="demo2-item" selected-item-class="selected" radio-required type="checkbox">
      <checker-item v-for="(item,index) in products" :key="index" :value="item.id" @click.native.stop="adjustChooseAll()">
        <div class="detail">
          <div class="checkbox-wrapper">
            <material-checkbox></material-checkbox>
          </div>
          <div><img :src="item.img" /></div>
          <div>
            <p>好吃的可爱多
              <span>(10支/一盒)</span>
            </p>
            <p>产品信息
              <span>10支/一盒</span>
            </p>
            <p>乳液体</p>
            <div class="price-info">
              <p class="price">￥990.0</p>
              <span class="number" v-if="!isEditing">×{{item.amount}}</span>
              <input-number size="mini" :value.sync="item.amount" :min="1" v-else></input-number>
            </div>
          </div>
        </div>
      </checker-item>
    </checker>
    <div class="shopcart_footer ">
      <material-checkbox class="checkbox " :value.sync="chooseAll" @click.native="doChooseAll()">全选</material-checkbox>
      <div class="close_price " @click="$router.push( 'buy') ">结算</div>
      <div class="price_all ">
        <p>消耗积分：￥
          <span>0.00</span>
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
      picked: '',
      chooseAll: false,
      products: [
        {
          id: 1,
          img: 'http://p0.meituan.net/600.600/deal/__38666717__4597520.jpg',
          title: '丰胸精油盒装（10支/一盒）',
          price: '900',
          info: '（10支/一盒）',
          category: '乳液体',
          amount: 1
        },
        {
          id: 2,
          img: 'http://p0.meituan.net/600.600/deal/__38666717__4597520.jpg',
          title: '丰胸精油盒装（10支/一盒）',
          price: '900',
          info: '（10支/一盒）',
          category: '乳液体',
          amount: 1
        }
      ],
      msg: '购物车',
      checked: true,
      isEditing: false,
      nums: true,
      num: 1
    }
  },
  methods: {
    //点击子项，更新全选状态
    adjustChooseAll() {
      const productIds = this.products.map(item => item.id)
      if (
        JSON.stringify(this.picked.slice().sort()) ===
        JSON.stringify(productIds.sort())
      ) {
        this.chooseAll = true
      } else {
        this.chooseAll = false
      }
    },
    //点击全选选择所有项目
    doChooseAll() {
      if (this.chooseAll === true) {
        this.picked = this.products.map(item => item.id)
      } else {
        this.picked = []
      }
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
  width: 100%;
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
