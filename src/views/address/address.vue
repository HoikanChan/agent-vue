<template>
  <div class="address">
    <x-header :left-options="{backText: ''}" @on-click-back="$router.push({name:'buy'})">
      <span>收货地址</span>
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="25" style="position:relative;top:-2px;" @click="$router.push({name:'buy'})"></x-icon>
      <!-- <x-icon slot="right" type="more" size="35" style="fill:#333;position:relative;top:-8px;left:-3px;"></x-icon> -->
      <i style="float:right;position: absolute;left: 85%;font-size:.15rem;color:#7e74ea;" @click="toggleEdit()">{{isEditing?"完成":"编辑"}}</i>
    </x-header>
    <div class="content">
      <checker v-model="pickedAddressId" default-item-class="demo2-item" selected-item-class="selected" radio-required>
        <checker-item v-for="(item,index) in addresses" :key="index" :value="item.id" ref="dataInfo">
          <div class="address-detail">
            <div class="checkbox-wrapper">
              <material-checkbox></material-checkbox>
            </div>
            <p>
              <span>收货人：{{item.userName}}</span>
              <span>电话号码：{{item.telNumber}}</span>
            </p>
            <p style="padding-bottom:.15rem;">
              <span>收货地址：{{item.provinceName}}{{item.cityName}}{{item.countyName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </p>
            <div class='editer' v-if="isEditing">
              <span style="padding-right:10%;" @click.stop="editer(item)">修改</span>
              <span style="padding-right:10%;" @click.stop="del(item.id)">删除</span>
            </div>
          </div>
        </checker-item>
      </checker>
    </div>
    <div class="foot_add" @click="addAddress">添加收货地址</div>
  </div>
</template>
<script>
import { XHeader, Checker, CheckerItem } from 'vux'
import Checkbox from 'components/Checkbox'
import AddressService from 'services/AddressService'

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
  activated() {
    this.getaddress()
    if (this.$store.getters.getAddress) {
      this.pickedAddressId = this.$store.getters.getAddress.id
    }
  },
  methods: {
    getaddress() {
      AddressService.get()
        .then(response => {
          this.addresses = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    del(id) {
      AddressService.delete(id)
        .then(response => {
          console.log('删除成功！')
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
    toggleEdit() {
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
  width: 90%;
  padding: 0 5%;
  background: #fff;

  // height: 1.04rem;
  font-weight: bold;
  p {
    &:nth-child(2) {
      display: inline-block;
      height: 0.4;
      line-height: 0.4rem;
      margin-top: 0.05rem;
    }
  }
  .editer {
    text-align: right;
    color: #999;
    text-align: right;
    height: 0.3rem;
    line-height: 0.3rem;
    // border-top:1px solid #ccc;
  }
}
// .address-detail {
//   font-size: 14px;
//   height: 1.04rem;
//   border-bottom: 1px solid #ccc;
//   background: #fff;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   padding: 0 0.5rem 0 0.3rem;
//   position: relative;
//   p {
//     margin: 0.05rem 0;
//     position: relative;
//     display: flex;
//     justify-content: space-between;
//   }
//   img {
//     position: absolute;
//     left: -0.3rem;
//     top: -0.05rem;
//   }
//   .forward-icon {
//     fill: #7e74ea;
//     position: absolute;
//     right: 0.2rem;
//     bottom: 0.05rem;
//   }
// }
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
.vux-checker-item {
  width: 100%;
}
.material-checkbox {
  line-height: 90px !important;
}
.material-checkbox > span[data-v-3fe23622]::after {
  top: 30px !important;
}
.vux-checker-item {
  border-bottom: 1px solid #ccc;
}
</style>
