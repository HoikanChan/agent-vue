<template>
  <div class="address">
    <x-header :left-options="{backText: ''}">
      <span>收货地址</span>
      <x-icon slot="right" type="more" size="35" style="fill:#333;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <!-- <checklist  :options="inlineDescList" v-model="inlineDescListValue" @on-change="change"></checklist> -->
  </div>
</template>
<script>
import {
  XHeader,
  Picker,
  PopupHeader,
  Popup,
  TransferDom,
  XInput,
  Group,
  XButton,
  Toast
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
    Toast
  },
  data() {
    return {
      form: {
        area: []
      },
      toastShow: false,
      popShow: false,
      address: [],
      addresses: [
        {
          name: '中国',
          value: 'china',
          parent: 0
        },
        {
          name: '美国',
          value: 'USA',
          parent: 0
        },
        {
          name: '广东',
          value: 'china001',
          parent: 'china'
        },
        {
          name: '广西',
          value: 'china002',
          parent: 'china'
        },
        {
          name: '美国001',
          value: 'usa001',
          parent: 'USA'
        },
        {
          name: '美国002',
          value: 'usa002',
          parent: 'USA'
        },
        {
          name: '广州',
          value: 'gz',
          parent: 'china001'
        },
        {
          name: '深圳',
          value: 'sz',
          parent: 'china001'
        },
        {
          name: '广西001',
          value: 'gz',
          parent: 'china002'
        },
        {
          name: '广西002',
          value: 'sz',
          parent: 'china002'
        },
        {
          name: '美国001_001',
          value: '0003',
          parent: 'usa001'
        },
        {
          name: '美国001_002',
          value: '0004',
          parent: 'usa001'
        },
        {
          name: '美国002_001',
          value: '0005',
          parent: 'usa002'
        },
        {
          name: '美国002_002',
          value: '0006',
          parent: 'usa002'
        }
      ]
    }
  },
  methods: {
    showPop() {
      this.popShow = true
    },
    addAddress() {
      if (
        this.$refs.name.valid &&
        this.$refs.mobile.valid &&
        this.$refs.address.valid
      ) {
        this.$store.commit('setAddress', this.form)
        this.$router.go(-1)
      } else {
        this.toastShow = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
body {
  background: #f8f8f8;
}
.address-form {
  div {
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
.address-form {
  .weui-cells {
    font-size: 0.13rem;
    margin-top: 0;
    label {
      font-weight: bold;
    }
  }
}
</style>
