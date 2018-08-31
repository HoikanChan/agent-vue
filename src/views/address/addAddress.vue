<template>
  <div class="address">
    <x-header :left-options="{backText: ''}">
      <span>添加收货地址</span>
      <x-icon slot="right" type="more" size="35" style="fill:#333;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <group class="address-form">
      <x-input title="收货人" placeholder="请输入收货人" :required="true" ref="name" v-model="form.name">
      </x-input>
      <x-input title="联系电话" placeholder="请输入联系电话" :required="true" ref="mobile" v-model="form.mobile" is-type="china-mobile">
      </x-input>
      <div>
        <span>
          <label style="margin-right:1em">所在地</label>
          <span>{{form.area?form.area.join(" "):''}}</span>
        </span>
        <x-icon type="ios-arrow-forward" size="30" @click="showPop()"></x-icon>
      </div>
      <x-input title="详细地址" placeholder="请输入详细地址" :required="true" ref="address" v-model="form.address">
      </x-input>
    </group>
    <x-button type="primary" action-type="submit" @click.native="addAddress()" style="width: 90.4%;margin: 1.65rem auto;">保存</x-button>
    <div v-transfer-dom>
      <popup v-model="popShow">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header left-text="取消" right-text="确认" title="请选择所在地" :show-bottom-border="false" @on-click-left="popShow = false" @on-click-right="popShow = false">
        </popup-header>
        <picker :data='addresses' :columns=3 v-model='form.area' ref="picker1"></picker>
      </popup>
    </div>
    <toast v-model="toastShow" type="text" position="top" width="10.6em">请完善地址信息</toast>
  </div>
</template>
<script>
import axios from 'axios';
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
        // this.$router.go(-1)
        console.log(this.form)
        var userName= this.form.name;
        var telNumber=this.form.mobile;
        var address = this.form.address;
        var countyName= this.form.area[0];
        var provinceName= this.form.area[1];
        var cityName= this.form.area[2];
        var detailInfo = this.form.address;
        axios.post('http://124.200.40.10:17080/agent/api/v1/address/save',{
          userName,telNumber,address,countyName,provinceName,cityName,detailInfo
        }).then((response)=>{
          // localStorage.setItem('address',JSON.stringify( response.data.data))
          this.$router.push({ path: '/address' })
        }).catch((error=>{
          console.log(error)
        }))

      } else {
        this.toastShow = true
      }
    }
  },
  mounted() {
      axios.get('http://124.200.40.10:17080/agent/api/v1/region/provinceList').then(res=>{
        console.log(res)
        this.addresses.name=res.data.data.name
         this.addresses.value=res.data.data.value
      })
  },


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
