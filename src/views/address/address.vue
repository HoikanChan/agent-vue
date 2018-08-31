<template>
  <div class="address">
    <x-header :left-options="{backText: ''}">
      <span>收货地址</span>
      <!-- <x-icon slot="right" type="more" size="35" style="fill:#333;position:relative;top:-8px;left:-3px;"></x-icon> -->
      <i style="float:right;position: absolute;left: 85%;font-size:.15rem;color:#7e74ea;">管理</i>
    </x-header>
    <checker v-model="pickedAddressId" default-item-class="demo2-item" selected-item-class="selected" radio-required>
      <checker-item v-for="(item,index) in addresses" :key="index" :value="item.id" ref="dataInfo">
        <div class="address-detail" style="width:91%;">
          <div class="checkbox-wrapper">
            <material-checkbox></material-checkbox>
          </div>
          <p>
            <span>收货人：{{item.userName}}</span>
            <span>电话号码：{{item.telNumber}}</span>
          </p>
          <p>
            <span>收货地址：{{item.provinceName}}{{item.cityName}}{{item.countyName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </p>
          <span style="text-align:right;color:red;" @click.stop="del(item.id)">删除</span>
        </div>
      </checker-item>
    </checker>
    <div class="foot_add" @click="$router.push({name:'addAddress'})">添加收货地址</div>
  </div>
</template>
<script>
import { XHeader, Checker, CheckerItem } from 'vux'
import Checkbox from 'components/Checkbox'
import axios from 'axios'
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
      addresses: []
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
  mounted(){
      axios.get('http://124.200.40.10:17080/agent/api/v1/address/list').then((response)=>{
        console.log(response.data.data);
        this.addresses=response.data.data
      }).catch((error)=> {
        console.log(error);
      });
  },
  methods: {
      del(id){
        console.log(id)
        axios.get('http://124.200.40.10:17080/agent/api/v1/address/delete?id='+id).then((response)=>{
          console.log('删除成功！')
        }).catch((error)=>{
          console.log(error);
          console.log('删除失败！')
        })
      }
  }
}
</script>
<style lang="less" scoped>
.address-detail {
  font-size: 14px;
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
.foot_add{
  width:100%;
  height: .44rem;
  line-height:.44rem;
  text-align:center;
  color:#fff;
  font-size:.14rem;
  background:#5b50d3;
  position:fixed;
  bottom:0;
}
</style>
