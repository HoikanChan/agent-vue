<template>
  <div class="address">
    <x-header :left-options="{backText: ''}">
      <span>收货地址</span>
      <x-icon slot="right" type="more" size="35" style="fill:#333;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <checker v-model="pickedAddressId" default-item-class="demo2-item" selected-item-class="selected" radio-required>
      <checker-item v-for="(item,index) in addresses" :key="index" :value="item.id">
        <div class="address-detail">
          <div class="checkbox-wrapper">
            <material-checkbox></material-checkbox>
          </div>
          <p>
            <span>收货人：{{item.name}}</span>
            <span>电话号码：{{item.mobile}}</span>
          </p>
          <p>
            <span>收货地址：{{item.address}}</span>
          </p>
        </div>

      </checker-item>
    </checker>
  </div>
</template>
<script>
import { XHeader, Checker, CheckerItem } from 'vux'
import Checkbox from 'components/Checkbox'
export default {
  components: {
    XHeader,
    Checker,
    CheckerItem,
    'material-checkbox': Checkbox
  },
  data() {
    return {
      pickedAddressId: '',
      form: {
        area: []
      },
      popShow: false,
      addresses: [
        {
          id: 1,
          area: ['china', 'china001', 'gz'],
          name: '大灰灰',
          mobile: '15655556666',
          address: '北京市朝阳区王府井路马化腾花园5座404'
        },
        {
          id: 2,
          area: ['china', 'china001', 'gz'],
          name: '灰灰',
          mobile: '15655556666',
          address: '北京市朝阳区王府井路马化腾花园5座404'
        }
      ]
    }
  },
  watch: {
    pickedAddressId: function(val, oldval) {
      this.$store.commit(
        'setAddress',
        this.addresses.find(item => item.id === val)
      )
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.address-detail {
  font-size: 14px;
  width: 100%;
  height: 1.04rem;
  border-bottom: 1px solid #ccc;
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 0.5rem 0 0.3rem;
  position: relative;
  p {
    margin: 0.05rem 0;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  img {
    position: absolute;
    left: -0.3rem;
    top: -0.05rem;
  }
  .forward-icon {
    fill: #7e74ea;
    position: absolute;
    right: 0.2rem;
    bottom: 0.05rem;
  }
}
.checkbox-wrapper {
  position: absolute;
  right: 0.05rem;
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
