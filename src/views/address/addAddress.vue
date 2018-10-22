<template>
  <div class="address">
    <x-header :left-options="{backText: ''}" @on-click-back="$router.push({name:'address'})">
      <span>添加收货地址</span>
    </x-header>
    <group class="address-form">
      <x-input title="收货人" placeholder="请输入收货人" :required="true" ref="name" v-model="form.userName">
      </x-input>
      <x-input title="联系电话" placeholder="请输入联系电话" is-type="china-mobile" :required="true" ref="telNumber" v-model="form.telNumber">
      </x-input>
      <x-address ref="area" title="所在地" v-model="form.area" :list="addressData" placeholder="请选择地址">
      </x-address>
      <x-input title="详细地址" placeholder="请输入详细地址" :required="true" ref="address" v-model="form.address">
      </x-input>
    </group>
    <x-button type="primary" action-type="submit" @click.native="addAddress()" style="width: 90.4%;margin: 1.65rem auto;">保存</x-button>
    <toast v-model="toastShow" type="text" position="top" width="10.6em">请完善地址信息</toast>
  </div>
</template>
<script>
import AddressService from 'services/AddressService'
import ShoppingCartService from 'services/ShoppingCartService'

import {
  XHeader,
  Picker,
  PopupHeader,
  Popup,
  TransferDom,
  XInput,
  Group,
  XButton,
  Toast,
  XAddress,
  ChinaAddressV4Data
} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Picker,
    XInput,
    Group,
    PopupHeader,
    Popup,
    XButton,
    Toast,
    XAddress
  },
  data() {
    return {
      form: {
        area: []
      },
      toastShow: false,
      popShow: false,
      addressData: ChinaAddressV4Data,
      address: [],
      userName: ''
    }
  },
  methods: {
    updateForm(toEditAddress) {
      if (toEditAddress) {
        this.form.area = [
          toEditAddress.provinceName,
          toEditAddress.cityName,
          toEditAddress.countyName
        ]
        this.form.telNumber = toEditAddress.telNumber || ''
        this.form.userName = toEditAddress.userName || ''
        this.form.address = toEditAddress.detailInfo || ''
      } else {
        this.form = {
          telNumber: '',
          userName: '',
          detailInfo: '',
          area: []
        }
      }
    },
    showPop() {
      this.popShow = true
    },
    async addAddress() {
      if (
        this.$refs.name.valid &&
        this.$refs.telNumber.valid &&
        this.$refs.address.valid
      ) {
        var userName = this.form.userName
        var telNumber = this.form.telNumber
        var address = this.form.address
        //省，市，区
        let [
          provinceName,
          cityName,
          countyName
        ] = this.$refs.area.nameValue.split(' ')
        var detailInfo = this.form.address
        const result = await AddressService.update({
          userName,
          telNumber,
          address,
          countyName,
          provinceName,
          cityName,
          detailInfo,
          id: this.$store.getters.getNewAddress
            ? this.$store.getters.getNewAddress.id
            : null
        })
        this.$store.commit('setAddress', result.data)
        if (result.errno) {
          this.$vux.toast.show({
            width: '10em',
            type: 'warn',
            text: result.errmsg
          })
        } else {
          const checkresult = await ShoppingCartService.checkout(result.data.id)
          this.$store.dispatch('setBill', checkresult.data)
          this.form = {
            telNumber: '',
            userName: '',
            detailInfo: '',
            area: []
          }
          this.$router.push({ name: 'buy' })
        }
      } else {
        this.toastShow = true
      }
    }
  },
  computed: {
    newAddress: function() {
      return this.$store.getters.getNewAddress || {}
    }
  },
  watch: {
    newAddress: function(val) {
      this.updateForm(val)
    }
  },

  mounted() {
    this.updateForm(this.$store.getters.getNewAddress)
  }
}
</script>
<style lang="less" scoped>
.vux-popup-header-right {
  color: #5b50d3 !important;
}
body {
  background: #f8f8f8;
}
.address-form {
  > div {
    padding: 10px 15px;
    position: relative;
    display: flex;
    align-items: center;
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
}
.address_msg {
  background: #fff;
  li {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.13rem;
    padding: 0 4.8%;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    input {
      width: 75%;
      height: 0.5rem;
      border: none;
      float: right;
    }
  }
}
.keep {
  width: 90.4%;
  height: 0.44rem;
  font-size: 0.16rem;
  color: #fff;
  line-height: 0.44rem;
  text-align: center;
  background: #d60000;
  margin: 1.65rem auto;
  border-radius: 0.03rem;
}
</style>
<style lang="less">
.address {
  input {
    text-align: right;
  }
  .weui-cell_access .weui-cell__ft:after {
    right: -142px !important;
  }
  .address-form {
    .weui-cells {
      font-size: 0.13rem;
      margin-top: 0;
      label {
        font-weight: bold;
      }
    }
  }
}
</style>
