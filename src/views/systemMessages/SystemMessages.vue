<template>
  <div class="realname-container">
    <x-header :left-options="{backText: ''}" style="border-bottom: 1px solid #ccc ;">
      <span>系统消息</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
      <a slot="right" type="more" size="35" style="color:#5b50d3" @click="readAll">全部已读</a>
    </x-header>
    <div class="content">
      <div class="type-select">
        <p @click="show=true">{{pickedTypeTitle}}
          <img src="../../assets/images/style.png"  />
        </p>
          <p @click="readTypeshow=true">{{pickedReadTypeTitle}}
            <img src="../../assets/images/style.png"  />
        </p>
            <!-- <x-button mini type="primary" >全部设为已读</x-button> -->
      </div>
      <div class="item" v-for="(item,index) in messages" :key="index">
        <img src="../../assets/images/sys_msg.png" alt="">
        <span>
          <div class="headbar">
            <div>
              <div class="type">{{item.typeName || '系统消息'}}</div>
              <div class="time">{{item.createTime}}</div>
            </div>
            <div>
              <span v-if="item.hasRead === '已读'" style="color:#777">已读</span>
              <a v-else class="read-btn" mini plain type="primary" @click="read(item.id)">设为已读</a>
            </div>
          </div>
          <div class="content">
            <div class="msg-content">{{item.template}}</div>
          </div>
        </span>
      </div>
      <div v-if="messages.length === 0" style="text-align:center;padding:24px;">暂无消息</div>
    </div>
    <div v-transfer-dom>
      <popup v-model="show">
        <div class="popup">
          <div class="popup-header">
            <x-button mini plain @click.native="show=flase">取消</x-button>
            <h4>选择消息类型</h4>
            <x-button mini type="primary" @click.native="typeChoosed">完成</x-button>
          </div>
          <div class="popup-content">
            <span class="type" v-for="type in types" :key="type.key" :class="{'picked':type.key === popupPickedType}" @click="pickType(type.key)">{{type.title}}</span>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="readTypeshow">
        <div class="popup">
          <div class="popup-header">
            <x-button mini plain @click.native="readTypeshow=flase">取消</x-button>
            <h4></h4>
            <x-button mini type="primary" @click.native="readtypeChoosed">完成</x-button>
          </div>
          <div class="popup-content">
            <span class="type" v-for="type in readTypes" :key="type.key" :class="{'picked':type.key === popupReadType}" @click="pickReadType(type.key)">{{type.title}}</span>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import LogService from 'services/LogService'
import { XHeader, TransferDom, Popup, XButton } from 'vux'
export default {
  name: 'Login',
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Popup,
    XButton
  },
  data: function() {
    return {
      show: false,
      readTypeshow: false,
      pickedType: 'all',
      popupPickedType: 'all',
      types: [
        { key: 'all', title: '全部类型' },
        { key: '0001', title: '积分充值' },
        { key: '0002', title: '会员升级' },
        { key: '0003', title: '会员注册' },
        { key: '0004', title: '积分奖励' },
        { key: '0005', title: '实名认证' }
      ],

      readType: 'all',
      popupReadType: 'all',
      readTypes: [
        { key: 'all', title: '全部' },
        { key: 1, title: '已读' },
        { key: 0, title: '未读' }
      ],
      messages: []
    }
  },
  computed: {
    pickedTypeTitle: function() {
      return this.types.find(item => item.key === this.pickedType).title
    },
    pickedReadTypeTitle: function() {
      return this.readTypes.find(item => item.key === this.readType).title
    }
  },
  methods: {
    pickType(type) {
      this.popupPickedType = type
    },
    pickReadType(type) {
      this.popupReadType = type
    },
    async typeChoosed() {
      this.show = false
      this.pickedType = this.popupPickedType
      this.$vux.loading.show()
      await this.getList()
      this.$vux.loading.hide()
    },
    async readtypeChoosed() {
      this.readTypeshow = false
      this.readType = this.popupReadType
      this.$vux.loading.show()
      await this.getList()
      this.$vux.loading.hide()
    },
    async getList() {
      this.messages =
        (await LogService.get(this.pickedType, this.readType)).data || []
    },
    async read(id) {
      this.$vux.loading.show()
      await LogService.read(id)
      await this.getList()
      this.$vux.loading.hide()
    },
    async readAll() {
      this.$vux.loading.show()
      await LogService.readAll()
      await this.getList()
      this.$vux.loading.hide()
    }
  },
  activated() {
    this.getList(this.pickedType)
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  background: #fff;
  padding: 0.2rem;
  margin-bottom: 0.08rem;
  box-shadow: 0px 1px 3px 0px rgba(198, 193, 193, 0.2),
    0px 1px 1px 0px rgba(198, 193, 193, 0.14),
    0px 5px 1px -1px rgba(198, 193, 193, 0.12);

  img {
    width: 0.4rem;
    height: 0.35rem;
  }
  span {
    flex: 1 1 auto;
    margin-left: 0.13rem;
    font-size: 0.14rem;
    .headbar {
      display: inline-flex;
      align-items: flex-start;
      width: 100%;

      justify-content: space-between;

      .type {
        font-size: 0.15rem;
        color: #666;
        height: 0.16rem;
        line-height: 0.16rem;
      }
      .time {
        color: #999;
        font-size: 0.12rem;
        height: 0.28rem;
        line-height: 0.28rem;
      }
    }
    .content {
      margin-top: 0.05rem;
      padding: 0.1rem;
      border-radius: 3px;
      background-color: #f2f2f2;
      .title {
        color: @primary-color;
        height: 0.15rem;
        line-height: 0.15rem;
        font-size: 0.12rem;
      }
      .msg-content {
        color: #666;
        margin-top: 0.04rem;
        font-size: 0.12rem;
      }
    }
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
      font-size: 0.13rem;
      text-align: center;
      color: #666;
    }
    .weui-btn_mini {
      padding: 0 0.6em;
      font-size: 0.12rem;
    }
    .weui-btn_plain-default {
      border: 1px solid #c2c2c2;
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
      color: #666;
      font-size: 0.14rem;
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
.vux-header {
  border-bottom: 1px solid #eee !important;
}
.read-btn {
  color: @primary-color;
}
.type-select {
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 1em 2em;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(198, 193, 193, 0.2),
    0px 1px 1px 0px rgba(198, 193, 193, 0.14),
    0px 5px 1px -1px rgba(198, 193, 193, 0.12);
  margin-bottom: 1em;
  button {
    margin: 0;
  }
  img {
    width: 0.15rem;
    height: 0.08rem;
  }
}
</style>
