<template>
  <div class="usersetting">
    <x-header :left-options="{backText: ''}">
      个人设置
      <a slot="right" class="save-btn">保存</a>
    </x-header>
    <group>
      <p>
        <span>头像</span>
      </p>
      <x-input placeholder-align="right" title="头像"  :required="true" ref="mobile" v-model="form.avatar" >
      </x-input>
      <x-input placeholder-align="right" title="昵称" type="text" placeholder="请输入昵称" :required="true" ref="code" v-model="form.nickname">
      </x-input>
      <x-input placeholder-align="right" title="性别" type="text" readonly :show-clear="false" placeholder="请输入性别" :required="true" ref="psw" v-model="form.sex">
        <x-icon slot="right" type="ios-arrow-forward" style="margin-top: 6px;fill:#aaa" size="15" @click="sexShow = true"></x-icon>
      </x-input>
      <datetime title="生日" v-model="form.birthday" format="YYYY-MM-DD"></datetime>
      <!-- <x-input title="生日" type="text" placeholder="请输入生日" readonly :show-clear="false" :required="true" v-model="form.birthday">
        <x-icon slot="right" type="ios-arrow-forward" style="margin-top: 6px;fill:#aaa" size="15" @click="timeShow = true"></x-icon>
      </x-input> -->
    </group>
    <group style="margin-top: .1rem;">
      <x-input placeholder-align="right" title="手机号码" type="text" placeholder="请输入手机号码" :required="true" v-model="form.mobile" is-type="china-mobile">
      </x-input>
      <x-input placeholder-align="right" title="注册时间" type="text" readonly :show-clear="false" :required="true" v-model="form.createdAt">
      </x-input>
      <x-address title="所在地" v-model="form.location" :list="addressData" placeholder="请选择地址">
        <x-button mini plain slot="left-text">取消</x-button>
      </x-address>
    </group>
    <group style="margin-top: .2rem;">
      <x-input placeholder-align="right" title="实名认证" type="text" readonly :show-clear="false" v-model="form.isVerified">
        <x-icon slot="right" type="ios-arrow-forward" style="margin-top: 6px;fill:#aaa" size="15"></x-icon>
      </x-input>
    </group>
    <div v-transfer-dom>
      <popup v-model="sexShow">
        <div class="popup">
          <div class="popup-header">
            <x-button mini plain @click.native="sexShow=flase">取消</x-button>
            <h4>选择积分变更类型</h4>
            <x-button mini type="primary" @click.native="typeChoosed">完成</x-button>
          </div>
          <div class="popup-content">
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="timeShow">
        <div class="popup time-popup">
          <div class="popup-header">
            <x-button mini plain @click.native="timeShow=flase" style="background-color:#fff;border:1px solid #f4f4f4">取消</x-button>
            <h4></h4>
            <x-button mini type="primary" @click.native="timeChoosed">完成</x-button>
          </div>
          <datetime-view v-model="popupPickedTime" format="YYYY-MM-DD" :min-year="1900">

          </datetime-view>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import {
  XButton,
  XInput,
  Group,
  XHeader,
  DatetimeView,
  Datetime,
  Popup,
  TransferDom,
  XAddress,
  ChinaAddressV4Data
} from 'vux'
export default {
  name: 'UserSetting',
  directives: {
    TransferDom
  },
  components: {
    XButton,
    XInput,
    Group,
    XHeader,
    Datetime,
    Datetime,
    Popup,
    XAddress
  },
  data() {
    return {
      msg: '个人设置',
      datetime0: '',
      sexShow: false,
      timeShow: false,
      addressData: ChinaAddressV4Data,
      form: {
        avatar: '',
        nickname: 'faifai',
        sex: 1,
        birthday: '2018-03-14',
        mobile: '12344445555',
        createdAt: '2018-02-13',
        location: [],
        isVerified: false
      }
    }
  },
  methods: {
    open() {
      this.$refs.datetime.open()
    }
  }
}
</script>
<style scoped lang="less">
.save-btn {
  color: @primary-color !important;
}
.popup {
  .popup-header {
    display: flex;
    padding: 8px 0.15rem;
    background: #fff;
    align-items: center;
    h4 {
      flex: 1 1 auto;
      font-weight: 500;
      font-size: 0.14rem;
      text-align: center;
    }
  }
  .popup-content {
    display: flex;
    flex-wrap: wrap;
    padding: 2%;
    padding-bottom: 1.2rem;
    .type {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 32%;
      margin: 1%;
      padding: 0.15rem 0;
      background: #fff;
      color: #333;
      &:nth-child(3n-2) {
        margin-left: 0;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
      &:hover {
        background: @primary-color;
        color: #fff;
      }
      &.picked {
        background: @primary-color;
        color: #fff;
      }
    }
  }
}
.time-popup {
  .popup-header {
    background: #ddd;
  }
}
</style>
<style lang="less">
.usersetting {
  .weui-input {
    text-align: right;
    color: #999;
  }
  .weui-cell {
    padding: 12px 15px;
  }
}
.vux-popup-header-right {
  color: @primary-color !important;
}
</style>
