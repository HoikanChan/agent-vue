<template>
  <div class="usersetting">
    <x-header :left-options="{backText: ''}">
      个人设置
      <a slot="right" class="save-btn" @click="updatePersonalInfo">保存</a>
    </x-header>
    <group>
      <p class="avatar-cell">
        <span>头像</span>
        <img :src="form.avatar || defaultAvatar" alt="">
      </p>
      <x-input placeholder-align="right" title="昵称" type="text" placeholder="请输入昵称" :required="true" ref="code" v-model="form.nickname">
      </x-input>
      <p class="avatar-cell">
        <span>性别</span>
        <span style="display:flex;align-items:center;" @click="showSexPopUp()">
          <span style="color: #999;">{{sex}}</span>
          <x-icon slot="right" type="ios-arrow-forward" style="fill:#aaa" size="15"></x-icon>
        </span>
      </p>
      <datetime title="生日" v-model="form.birthday" format="YYYY-MM-DD"></datetime>
      <!-- <x-input title="生日" type="text" placeholder="请输入生日" readonly :show-clear="false" :required="true" v-model="form.birthday">
        <x-icon slot="right" type="ios-arrow-forward" style="margin-top: 6px;fill:#aaa" size="15" @click="timeShow = true"></x-icon>
      </x-input> -->
    </group>
    <group style="margin-top: .1rem;">
      <x-input placeholder-align="right" readonly title="手机号码" type="text" placeholder="请输入手机号码" :required="true" v-model="form.mobile" is-type="china-mobile">
      </x-input>
      <x-input placeholder-align="right" title="注册时间" type="text" readonly :show-clear="false" :required="true" v-model="form.registerTime">
      </x-input>
      <x-address ref="address" title="所在地" v-model="form.location" :list="addressData" placeholder="请选择地址">
        <x-button mini plain slot="left-text">取消</x-button>
      </x-address>
    </group>

    <group style="margin-top: .2rem;">
      <x-input placeholder-align="right" title="实名认证" type="text" readonly :show-clear="false" v-model="form.isVerified">
        <x-icon slot="right" type="ios-arrow-forward" style="margin-top: 6px;fill:#aaa" size="15" @click="$router.push({name:'realName'})"></x-icon>
      </x-input>
    </group>
    <div v-transfer-dom>
      <popup v-model="sexShow">
        <div class="popup">
          <div class="popup-header">
            <x-button mini plain @click.native="popupHide">取消</x-button>
            <h4></h4>
            <x-button mini type="primary" @click.native="sexesChoosed">完成</x-button>
          </div>
          <div class="popup-content">
            <checker v-model="pickedSex" default-item-class="demo2-item" selected-item-class="selected" radio-required>
              <checker-item v-for="(item,index) in sexes" :key="index" :value="item.value">
                <div class="detail">
                  <div class="checkbox-wrapper">
                    <material-checkbox></material-checkbox>
                  </div>
                  <p>
                    {{item.title}}
                  </p>
                </div>
              </checker-item>
            </checker>
          </div>
        </div>
      </popup>
    </div>
    <div class="loginout" @click="logout">退出登录</div>
    <div class="shade" v-if="flag"></div>
    <div class="modal" v-if="flag">
      <p>温馨提醒</p>
      <p>是否退出当前帐号</p>
      <div @click="tologin">
        <span>确定</span>
      </div>
      <img @click="close" src="../../assets/images/close.png" />
    </div>
  </div>
</template>
<script>
import AuthService from 'services/AuthenticationService'
import defaultAvatar from 'assets/images/avatar.png'
import Checkbox from 'components/Checkbox'
import {
  XButton,
  XInput,
  Group,
  XHeader,
  Datetime,
  Popup,
  TransferDom,
  XAddress,
  Checker,
  CheckerItem,
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
    Popup,
    'material-checkbox': Checkbox,
    XAddress,
    Checker,
    CheckerItem
  },
  computed: {
    sex: function() {
      const gender = this.sexes.find(i => i.value === this.form.gender)
      return gender ? gender.title : '无信息'
    }
  },
  data() {
    return {
      flag: false,
      msg: '个人设置',
      datetime0: '',
      sexShow: false,
      timeShow: false,
      addressData: ChinaAddressV4Data,
      sexes: [{ title: '男', value: 1 }, { title: '女', value: 2 }],
      pickedSex: 1,
      defaultAvatar: defaultAvatar,
      form: {
        avatar: '',
        nickname: '',
        gender: '1',
        birthday: '2018-03-14',
        mobile: '',
        registerTime: '',
        location: [],
        isVerified: '未认证'
      }
    }
  },
  methods: {
    showSexPopUp() {
      this.sexShow = true
    },
    open() {
      this.$refs.datetime.open()
    },
    popupHide() {
      this.sexShow = false
    },
    sexesChoosed() {
      this.form.gender = this.pickedSex
      this.sexShow = false
    },
    logout() {
      this.flag = true
    },
    close() {
      this.flag = false
    },
    tologin() {
      AuthService.logout()
      this.$store.dispatch('setUser', '')
      this.$router.push({ path: '/login' })
    },
    async updatePersonalInfo() {
      console.log(this.$refs.address.nameValue)
      const result = await AuthService.updatePersonalInfo({
        gender: this.form.gender,
        nickname: this.form.nickname,
        birthday: this.form.birthday,
        location: this.$refs.address.nameValue
      })
      this.$vux.toast.show({
        width: '15em',
        type: result.errno ? 'warn' : 'success',
        text: result.errmsg
      })
      this.upateInfo()
    },
    async upateInfo() {
      this.form = (await AuthService.userinfo()).data
      this.form.birthday = this.form.birthday.slice(0, -9)
      this.form.location = this.form.location
        ? this.form.location.split(' ')
        : []
    }
  },
  async mounted() {
    this.upateInfo()
  }
}
</script>
<style scoped lang="less">
.save-btn {
  color: @primary-color !important;
}
.avatar-cell {
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  img {
    width: 0.5rem;
    cursor: pointer;
  }
  &:before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }
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
.popup-content {
  flex-direction: column;
  display: flex;
}
.detail {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.2rem;
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
  .vux-popup-header-right {
    color: @primary-color !important;
  }
}
.popup {
  .vux-checker-box {
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    padding: 0.5rem;
  }
}
.loginout {
  width: 77.4%;
  height: 0.4rem;
  background: #5b50d3;
  line-height: 0.4rem;
  text-align: center;
  margin: 0.27rem auto;
  border-radius: 0.1rem;
  font-size: 0.14rem;
  color: white;
}
.shade {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.4;
  /*兼容IE8及以下版本浏览器*/
  filter: alpha(opacity=30);
  display: block;
}
.modal {
  position: absolute;
  z-index: 101;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 73%;
  height: 1.34rem;
  margin: auto;
  display: block;
  border-radius: 0.15rem;
  background: #fff;
  p {
    text-align: center;
    &:nth-child(1) {
      font-size: 0.15rem;
      height: 0.24rem;
      line-height: 0.24rem;
      margin-top: 0.14rem;
      color: #000;
      font-weight: bold;
    }
    &:nth-child(2) {
      font-size: 0.12rem;
      color: #999;
      height: 0.31rem;
      line-height: 0.31rem;
      margin-top: 0.09rem;
    }
  }
  > div {
    width: 100%;
    height: 0.4rem;
    opacity: 0.3;
    background: #999;
    margin-top: 0.16rem;
    text-align: center;
    line-height: 0.4rem;

    span {
      color: #5b50d3;
    }
  }
  img {
    width: 0.13rem;
    height: 0.13rem;
    position: absolute;
    left: 87%;
    top: 0.14rem;
  }
}
</style>
