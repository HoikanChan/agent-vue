<template>
  <div class="address">
    <x-header :left-options="{backText: ''}" @on-click-back="$router.push({name:'buy'})">
      <span>收货地址</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.push({name:'buy'})">
      <i style="float:right;position: absolute;left: 85%;font-size:.15rem;color:#7e74ea;" @click="toggleEdit()">{{isEditing?"完成":"编辑"}}</i>
    </x-header>
    <div class="content">
      <checker v-model="pickedAddressId" default-item-class="demo2-item" selected-item-class="selected" radio-required>
        <checker-item v-for="(item,index) in addresses" :key="index" :value="item.id" ref="dataInfo">
          <div class="address-detail">
            <div class="checkbox-wrapper">
              <material-checkbox v-show="!isEditing"></material-checkbox>
            </div>
            <p>
              <span>收货人：{{item.userName}}</span>
              <span>电话号码：{{item.telNumber}}</span>
            </p>
            <p style="padding-bottom:.15rem;">
              <span>收货地址：{{item.provinceName}}{{item.cityName}}{{item.countyName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </p>
            <div class='editer' v-if="isEditing" style="font-size:.14rem;color:#999;">
              <CheckIcon :value.sync="item.isDefault" @click.native.stop="setDefault(item.id)">
                <span>设为默认地址</span>
              </CheckIcon>
              <span style="width:16%;" @click.stop="editer(item)"><img style="width:.14rem;height:auto;margin-right:6%;" src="../../assets/images/editer.png" />修改</span>
              
              <span style="width:16%;" @click.stop="del(item.id)"><img style="width:.11rem;height:auto;margin-right:6%;" src="../../assets/images/delete.png" />删除</span>
            </div>
          </div>
        </checker-item>
      </checker>
    </div>
    <div class="foot_add" @click="addAddress">添加收货地址</div>
  </div>
</template>
<script>
import { XHeader, Checker, CheckerItem, CheckIcon } from 'vux'
import Checkbox from 'components/Checkbox'
//去掉父级元素为selected class 时选中的属性
import addressCheckbox from './Checkbox'
import AddressService from 'services/AddressService'

export default {
  components: {
    XHeader,
    Checker,
    CheckerItem,
    CheckIcon,
    'material-checkbox': Checkbox,
    Checkbox: addressCheckbox
  },
  data() {
    return {
      pickedAddressId: '',
      form: {
        area: []
      },
      popShow: false,
      addresses: [],
      isEditing: false
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
  async activated() {
    await this.getaddress()
  },
  methods: {
    async setDefault(id) {
      for (let add of this.addresses) {
        if (add.id !== id) {
          add.isDefault = false
        }
      }
    },
    getaddress() {
      AddressService.get()
        .then(response => {
          this.addresses = response.data.map(i => {
            i.isDefault = !!i.isDefault
            return i
          })
          if (this.$store.getters.getAddress) {
            this.pickedAddressId = this.$store.getters.getAddress.id
          } else {
            console.log(this.addresses)
            this.pickedAddressId = this.addresses.find(i => !!i.isDefault).id
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    del(id) {
      AddressService.delete(id)
        .then(response => {
          this.getaddress()
        })
        .catch(error => {
          console.log(error)
          console.log('删除失败！')
        })
    },
    addAddress() {
      this.$store.dispatch('setNewAddress', '')
      this.$router.push({ name: 'addAddress' })
    },
    editer(item) {
      this.$router.push({
        name: 'addAddress'
      })
      this.$store.dispatch('setNewAddress', item)
    },
    async toggleEdit() {
      if (this.isEditing === true) {
        const defaultAddress = this.addresses.find(i => i.isDefault)
        if (defaultAddress) {
          await AddressService.update({
            id: defaultAddress.id,
            isDefault: defaultAddress.isDefault ? 1 : 0
          })
          await this.getaddress()
        }
      }
      this.isEditing = !this.isEditing
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  margin-bottom: 0.5rem;
}
.address-detail {
  position: relative;
  width: 90%;
  padding: 0 5%;
  background: #fff;
  font-weight: 500;
  p {
    &:nth-child(2) {
      height: 0.4;
      line-height: 0.4rem;
      margin-top: 0.05rem;
      display: flex;
      justify-content: space-between;
    }
  }
  .editer {
    display: flex;
    align-items: center;
    text-align: right;
    color: #999;
    text-align: right;
    height: 0.4rem;
    line-height: 0.4rem;
    justify-content: space-between;
  }
}
.checkbox-wrapper {
  position: absolute;
  right: 0.05rem;
  top: 50%;
  transform: translateY(-50%);
}
</style>
<style lang="less">
.address-form {
  .weui-cells {
    font-size: 0.14rem;
    margin-top: 0;
    label {
      font-weight: bold;
    }
  }
}
.foot_add {
  width: 100%;
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
  color: #fff;
  font-size: 0.14rem;
  background: #5b50d3;
  position: fixed;
  bottom: 0;
}
.address {
  .vux-checker-item {
    width: 100%;
  }
  .weui-icon-success,
  .weui-icon-success:before {
    color: #655ad8 !important;
  }
}
.vux-check-icon > span {
  color: #999 !important;
  line-height: 23px;
}
</style>
