<template>
  <div class="forget-psw-container">
    <x-header :left-options="{backText: ''}" @on-click-back="$router.push({name:'mall'})">
      <span>确认下单</span>
      <x-icon slot="right" type="more" size="35" style="fill:#333;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <div class="address-detail" v-if="address">
      <p>
        <span>收货人：{{address.userName}}</span>
        <span>电话号码：{{address.telNumber}}</span>
      </p>
      <p>
        <img src="../../assets/images/location.png" alt="" style="width:0.18rem;">
        <span>收货地址：{{address.provinceName+address.cityName+address.countyName+address.detailInfo}}</span>
      </p>
      <x-icon type="ios-arrow-forward" style="fill:#7e74ea" size="24" class="forward-icon" @click="$router.push({name:'address'})"></x-icon>
    </div>
    <div class="place" v-else>
      <router-link to="/addAddress">
        <x-icon type="ios-plus-empty" size="35"></x-icon>
        <span>点击填写收货人信息</span>
      </router-link>
    </div>
    <div class="product-list">
      <div class="product-item" v-for="(item,index) in products" :key="index">
        <x-img :src="item.listPicUrl" style="width:1.2rem;height:1.2rem;"></x-img>
        <div class="product-detail">
          <div class="title">{{item.goodsName}}</div>
          <div class="info">
            <div class="unit">{{item.goodsSpecifitionNameValue}}</div>
            <div class="category">{{item.category}}</div>
          </div>
          <div class="foot">
            <span class="price">￥{{item.marketPrice}}</span>
            <span class="amount">x{{item.number}}</span>
          </div>
        </div>
      </div>
    </div>
    <group class="bills-detail">
      <x-input title="送货时间" readonly type="text" placeholder="送货时间不限" v-model="bills.msg">
        <x-icon slot="right" type="ios-arrow-forward" size="20"></x-icon>
      </x-input>
      <x-input title="买家留言" v-model="postscript" type="text" placeholder="选填：对本次交易的说明"></x-input>
      <p>
        <span>商品总价</span>
        <strong>￥{{bill.goodsTotalPrice}}</strong>
      </p>
      <p>
        <span>运费</span>
        <strong>￥{{bill.freightPrice}}</strong>
      </p>
      <p>
        <span>当前金额</span>
        <strong>￥{{bill.orderTotalPrice}}</strong>
      </p>
      <div class="total">

        <span>共{{bill.goodsTotalNumber}}件商品 消费积分：
          <strong>{{bill.orderTotalPrice}}</strong>
        </span>
      </div>
    </group>
    <div class="order_footer">
      <div>
        <p>消耗积分：
          <span>{{bill.orderTotalPrice}}</span>
        </p>
        <p>合计金额：{{bill.orderTotalPrice}}</p>
      </div>
      <div @click.stop="submitBills">提交订单</div>
    </div>
    <toast v-model="toastShow" type="text" width="11.6em">请填写收货人信息</toast>
    <div v-transfer-dom>
      <x-dialog v-model="dialogShow" class="dialog" hide-on-blur @on-hide="hideDialog">
        <div style="padding:15px;">
          <h3>确认密码</h3>
          <group>
            <x-input type="password" v-model="password" :required="true" ref="payPsw">
            </x-input>
          </group>
        </div>
        <button class="pay-btn" @click="pay()">确认支付</button>
        <br>
        <div @click="dialogShow=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import {
  XButton,
  XInput,
  Group,
  XHeader,
  Card,
  Popover,
  XImg,
  Toast,
  TransferDomDirective as TransferDom,
  XDialog
} from 'vux'
import ShoppingCartService from 'services/ShoppingCartService'

export default {
  name: 'Buy',
  directives: {
    TransferDom
  },
  components: {
    XButton,
    XInput,
    Group,
    XHeader,
    Popover,
    Card,
    XImg,
    Toast,
    XDialog
  },
  data: function() {
    return {
      toastShow: false,
      dialogShow: false,
      password: '',
      bills: {
        msg: '',
        deliveryTime: ''
      },
      postscript: ''
    }
  },
  methods: {
    submitBills() {
      if (!this.address) {
        this.toastShow = true
      } else {
        this.password = ''
        this.$refs.payPsw.clear()
        this.dialogShow = true
      }
    },
    hideDialog() {},
    async pay() {
      if (this.$refs.payPsw.valid && this.password) {
        this.dialogShow = false
        this.$vux.loading.show({
          text: '支付中'
        })
        const result = await ShoppingCartService.pay({
          addressId: this.address.id,
          psw: this.password,
          postscript: this.postscript
        })
        this.$vux.loading.hide()
        if (result.errno) {
          this.$vux.toast.show({
            width: '10em',
            type: 'warn',
            text: result.errmsg
          })
        } else {
          this.$router.push({ name: 'bought' })
        }
      }
    }
  },
  computed: {
    address: function() {
      return (
        this.$store.getters.getAddress ||
        this.$store.getters.getBill.checkedAddress
      )
    },
    products: function() {
      const bill = this.$store.getters.getBill
      return bill ? bill.checkedGoodsList : []
    },
    bill: function() {
      return this.$store.getters.getBill || {}
    }
  }
}
</script>

<style lang="less" scoped>
@color_1: #999;
.vux-x-icon {
  fill: #000;
}
.place {
  width: 100%;
  height: 1.04rem;
  border-bottom: 1px solid #ccc;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 67%;
    height: 0.43rem;
    line-height: 0.43rem;
    border: dashed #ccc 1px;
    text-align: center;
    color: @color_1;
    .vux-x-icon {
      fill: #a8a8a8;
    }
  }
}
.address-detail {
  font-size: 14px;
  font-weight: bold;
  height: 1.04rem;
  border-bottom: 1px solid #ccc;
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 0.3rem 0 0.5rem;
  position: relative;
  p {
    margin: 0.05rem 0;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  img {
    position: absolute;
    left: -0.22rem;
    top: 0rem;
  }
  .forward-icon {
    fill: #7e74ea;
    position: absolute;
    right: 0.2rem;
    bottom: 0.05rem;
  }
}
.bills-detail {
  margin-bottom: 0.6rem;
  p {
    padding: 10px 15px;
    position: relative;
    display: flex;
    justify-content: space-between;
    &:before {
      content: ' ';
      position: absolute;
      left: 15px;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #d9d9d9;
      color: #d9d9d9;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
  }
  div.total {
    padding: 10px 15px 42px;
    text-align: right;
    position: relative;
    &:before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 15px;
      right: 0;
      height: 1px;
      border-top: 1px solid #d9d9d9;
      color: #d9d9d9;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
  }
}
.product-item {
  padding: 0.15rem;
  display: flex;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }
  .product-detail {
    margin-left: 0.2rem;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    .title {
      font-size: 14px;
      font-weight: bold;
    }
    .info {
      flex: 1 1 auto;
      font-size: 14px;
    }
    .foot {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      span.price {
        color: @primary-color;
      }
      span.amount {
        color: #6b6b6b;
      }
    }
  }
}
@color_2: #fff;

.order_footer {
  width: 100%;
  height: 0.5rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  > div {
    float: left;
    &:nth-child(1) {
      width: 64.5%;
      height: 0.5rem;
      padding-right: 4.5%;
    }
    &:nth-child(2) {
      width: 31%;
      height: 0.5rem;
      background: @primary-color;
      color: @color_2;
      font-size: 0.16rem;
      text-align: center;
      line-height: 0.5rem;
      float: right;
    }
    p {
      display: inline-block;
      line-height: 0.5rem;
      font-size: 0.12rem;
      font-weight: bold;
      float: right;
      span {
        float: right;
      }
    }
  }
}
.dialog {
  border-radius: 15px;
  h3 {
    font-size: 16px;
  }
  .pay-btn {
    width: 100%;
    box-shadow: none;
    border: none;
    font-size: 16px;
    padding: 0.13rem;
    background-color: #d7d7d7;
    color: @primary-color;
  }
}
</style>

<style lang="less">
.bills-detail .weui-cells {
  font-size: 14px !important;
  margin-top: 0;
}
.dialog .weui-dialog {
  border-radius: 15px;
}
.dialog .weui-cells {
  &:before {
    border: none;
  }
}
</style>
