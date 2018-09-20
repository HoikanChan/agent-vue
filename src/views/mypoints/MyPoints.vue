<template>
  <div class="mypoints">
    <x-header :left-options="{backText: ''}">
      <span>我的积分</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
    </x-header>
    <div class="point_body">
      <p>可用积分：￥{{mypoints?mypoints.credit:"0.00"}}
        <!-- <span>元</span> -->
      </p>
         <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;押金：￥{{mypoints?mypoints.deposit:"0.00"}}
        <!-- <span>元</span> -->
      </p>
      <div class="detail">
        <div class="record">积分明细</div>
        <div class="deeded" @click="point">积分充值</div>
      </div>
    </div>
    <div class="date">
      <div class="time">
        <h3>{{pickedTime}}</h3>
        <p>支出&nbsp;
          <span>{{mypointsinfo?mypointsinfo.outTotalCredit:"0"}}</span>元
        </p>
        &nbsp;
        <p>收入&nbsp;
          <span>{{mypointsinfo?mypointsinfo.inTotalCredit:"0"}}</span>元
        </p>
      </div>
      <div class="rili">
        <img src="../../assets/images/date.png" @click="timeShow=true" />
      </div>
    </div>
    <div class="all_recode">
      <p @click="show=true">{{pickedTypeTitle}}
        <img src="../../assets/images/style.png" /></p>
      <ul>
        <li v-for="(item,key) in mypointsList" :key="key">
          <p class="type">{{item.logTypeText}}
            <span>{{item.credit}} </span>
          </p>
          <div class="time_balance">
            <p class="clock">{{item.createTime}}
            </p>
            <span>剩余:
              <i>{{item.userCredit || '0'}}</i>
            </span>
          </div>
          <p class="pay">{{item.statusText}}</p>
        </li>
        <div v-if="mypointsList.length === 0" style="text-align:center;padding:2em;"> 暂时没有数据</div>

      </ul>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="flag">
        <div class="recharge">
          <h2>积分充值 <img src="../../assets/images/flase.png" @click="hide()" /></h2>
          <div class="proptype">
            <p>上级姓名：{{chargeInfo.auditName}}</p>
            <p>上级联系方式：{{chargeInfo.mobile}}</p>
            <br>
            <group>
              <x-input title="" type="number" v-model="chargeForm.credit" :required="true" placeholder="请输入申请积分数"></x-input>
            </group>
            <group>
              <x-textarea title="" :max="100" v-model="chargeForm.postscript" placeholder="请输入留言" type="text"></x-textarea>
            </group>
            <p class="upload-line">
              <span>上传审核凭证</span>
              <vue-core-image-upload :crop="false" @imageuploading="imageuploading" @imageuploaded="imageuploaded" :data="data" :max-file-size="5242880" :url="uploadUrl">
                <img src="../../assets/images/upload.png" alt="" style="width:2.5em;">
              </vue-core-image-upload>
            </p>
            <div v-show="chargeForm.payPicUrl">
              <br>
              <img :src="chargeForm.payPicUrl" alt="" style=" width: 100%; height: 100%;">
            </div>
          </div>
          <x-button type="primary" action-type="submit" class="round-btn submit" @click.native="submit()">确定</x-button>
          <p>转让成功系统将自动发送消息</p>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <popup v-model="show">
        <div class="popup">
          <div class="popup-header">
            <x-button mini plain @click.native="show=flase">取消</x-button>
            <h4>选择积分变更类型</h4>
            <x-button mini type="primary" @click.native="typeChoosed">完成</x-button>
          </div>
          <div class="popup-content">
            <span class="type" v-for="type in types" :key="type.key" :class="{'picked':type.key === popupPickedType}" @click="pickType(type.key)">{{type.title}}</span>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="timeShow">
        <div class="time-popup">
          <div class="popup-header">
            <x-button mini plain @click.native="timeShow=flase" style="background-color:#fff;border:1px solid #c2c2c2">取消</x-button>
            <h4></h4>
            <x-button mini type="primary" @click.native="timeChoosed">完成</x-button>
          </div>
          <datetime-view v-model="popupPickedTime" format="YYYY-MM"></datetime-view>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import ApplyService from 'services/ApplyService'
import PointService from 'services/PointService'
import VueCoreImageUpload from 'vue-core-image-upload'
import { uploadUrl } from 'services/Api'

import { dateFormat } from 'vux'
import {
  XInput,
  XTextarea,
  XDialog,
  XButton,
  Group,
  DatetimeView,
  Alert,
  Popup,
  TransferDom,
  XHeader
} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XInput,
    XTextarea,
    XDialog,
    Group,
    DatetimeView,
    XButton,
    Alert,
    XButton,
    Popup,
    XHeader,
    'vue-core-image-upload': VueCoreImageUpload
  },
  data() {
    return {
      data: {},

      show: false,
      uploadUrl: uploadUrl,
      timeShow: false,
      mypoints: null,
      mypointsList: [],
      mypointsinfo: null,
      chargeForm: {
        credit: '',
        postscript: '',
        payPicUrl: ''
      },
      chargeInfo: {},
      flag: false,
      pickedType: 'all',
      popupPickedType: 'all',
      pickedTime: '2018-08',
      popupPickedTime: '2018-08',
      records: [
        {
          type: '其他类型',
          time: '2018-8-15 17:18:12',
          balance: '1100',
          cost: '-224.00',
          comment: '冲账'
        },
        {
          type: '其他类型',
          time: '2018-8-15 17:18:12',
          balance: '1100',
          cost: '-224.00',
          comment: '冲账'
        }
      ],
      types: [
        { key: 'all', title: '全部类型' },
        { key: '20', title: '积分充值' },
        { key: '21', title: '分成奖励' },
        { key: '22', title: '其他' }
      ]
    }
  },
  computed: {
    pickedTypeTitle: function() {
      return this.types.find(item => item.key === this.pickedType).title
    }
  },
  methods: {
    pickType(type) {
      this.popupPickedType = type
    },
    imageuploading() {
      this.$vux.loading.show({
        text: '正在上传'
      })
    },
    imageuploaded(res) {
      this.$vux.loading.hide()
      if (res.errno == 0) {
        this.chargeForm.payPicUrl = res.data.url
      }
    },
    typeChoosed() {
      this.show = false
      this.pickedType = this.popupPickedType
      this.updateList()
    },
    timeChoosed() {
      this.timeShow = false
      this.pickedTime = this.popupPickedTime
      this.updateList()
    },
    async submit() {
      if (!this.chargeForm.credit) {
        this.$vux.toast.show({
          type: 'warn',
          width: '15em',
          text: '申请积分不为空'
        })
      } else {
        const result = await ApplyService.chargePoint(this.chargeForm)
        this.$vux.toast.show({
          width: '15em',
          type: result.errno ? 'warn' : 'success',
          text: result.errno ? result.errmsg : '提交成功，等待上级审核'
        })
        this.chargeForm = {
          credit: '',
          postscript: '',
          payPicUrl: ''
        }
        this.flag = false
      }
    },
    async point() {
      this.flag = true
    },
    async updateList() {
      this.mypointsList =
        (await PointService.getList(this.popupPickedType, this.pickedTime))
          .data || {}
      this.mypointsinfo =
        (await PointService.getInfo(this.popupPickedType, this.pickedTime))
          .data || {}
    },
    hide() {
      this.flag = false
    }
  },
  async activated() {
    const now = dateFormat(new Date(), 'YYYY-MM')
    this.pickedTime = now
    this.popupPickedTime = now
    const result = (await ApplyService.chargeInfo()).data
    this.chargeInfo = result || {}
    this.mypoints = (await PointService.get()).data || {}
    this.updateList()
  }
}
</script>
<style lang="less" scoped>
.mypoints {
  .mypoints_head {
    height: 0.44rem;
    line-height: 0.44rem;
    padding: 0 4.8%;
    text-align: center;
    font-size: 0.18rem;
    .back {
      float: left;
      width: 0.1rem;
      height: 0.16rem;
      margin-top: 0.15rem;
    }
  }
  .point_body {
    width: 100%;
    height: 1.78rem;
    background: url('../../assets/images/point_bg.png') no-repeat center/cover;
    text-align: left;
    color: #fff;
    p {
      font-size: 0.19rem;
      padding-left: 37%;
      &:first-child {
        padding-top: 0.45rem;
      }
    }
    .detail {
      width: 45.6%;
      height: 0.26rem;
      margin-left: 40%;
      margin-top: 0.08rem;
      font-size: 0.13rem;
      .record {
        width: 50%;
        height: 0.3rem;
        border-radius: 0.13rem 0 0 0.13rem;
        background: #5b50d3;
        float: left;
        line-height: 0.3rem;
        text-align: center;
      }
      .deeded {
        width: 50%;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        border-radius: 0 0.13rem 0.13rem 0;
        background: #fff;
        float: left;
        color: #000;
      }
    }
  }
  .date {
    height: 0.66rem;
    background: #5b50d3;
    padding: 0 4.8%;
    color: #fff;
    display: flex;
    justify-content: space-between;
    .time {
      height: 0.64rem;
      font-size: 0.15rem;
      h3 {
        margin-top: 0.11rem;
        font-weight: normal;
        font-size: 0.16rem;
      }
      p {
        display: inline-block;
        margin-top: 0.02rem;
        font-size: 0.13rem;
      }
    }
    .rili {
      height: 0.64rem;
      img {
        width: 0.24rem;
        height: 0.23rem;
        float: right;
        margin-top: 0.2rem;
      }
    }
  }
  .all_recode {
    background: #fff;
    p {
      height: 0.55rem;
      line-height: 0.55rem;
      padding-left: 4.8%;
      font-size: 0.16rem;
      font-weight: 500;
      img {
        width: 0.15rem;
        height: 0.08rem;
      }
    }
    .months {
      width: 100%;
      height: 0.6rem;
      border-bottom: 1px solid #ccc;
      h4 {
        padding-left: 4.8%;
        font-size: 0.16rem;
        padding-top: 0.1rem;
      }
      p {
        display: inline-block;
        height: 0.23rem;
        line-height: 0.23rem;
        font-size: 0.14rem;
        color: #666;
      }
    }
    ul {
      li {
        height: 1rem;
        padding: 0 4.8%;
        border-top: 1px solid #eee;
        p {
          height: 0.45rem;
          line-height: 0.45rem;
        }
        .type {
          padding-left: 0;
          display: flex;
          justify-content: space-between;
          span {
            font-size: 0.14rem;
            color: #5b50d3;
          }
        }
        .time_balance {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .clock {
          padding-left: 0;
          font-weight: normal;
          height: 0.24rem;
          line-height: 0.24rem;
          display: inline-block;
          width: 60%;
          i {
            padding-left: 2%;
          }
        }
        span {
          font-size: 0.16rem;
        }
        .pay {
          font-size: 0.14rem;
          color: #666;
          padding-left: 0;
          font-weight: normal;
          height: 0.18rem;
          line-height: 0.18rem;
        }
      }
    }
  }
  .shade {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.3;
    /*兼容IE8及以下版本浏览器*/
    filter: alpha(opacity=30);
    display: block;
  }
}
.recharge {
  margin: auto;
  display: block;
  padding: 1em 0;
  border-radius: 0.05rem;
  background: #fff;
  max-height: 3.5rem;
  overflow: scroll;
  .upload-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h2 {
    text-align: center;
    font-size: 0.18rem;
    margin-top: 0.1rem;
    position: relative;
    img {
      width: 0.43rem;
      height: auto;
      position: absolute;
      right: 5%;
      top: -0.15rem;
    }
  }
  .proptype {
    width: 75%;
    margin: 0.15rem auto;
    p {
      text-align: left;
      padding: 0 15px;
      line-height: 1em;
      font-size: 0.13rem;
      color: rgb(51, 51, 51);
    }
  }
  .submit {
    width: 86%;
    height: 0.35rem;
    background: #5b50d3;
    color: #fff;
    line-height: 0.35rem;
    text-align: center;
    border-radius: 0.2rem;
    margin-top: 0.15rem;
    font-size: 0.14rem;
  }
  p {
    text-align: center;
    margin-top: 0.1rem;
    color: #999;
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
.time-popup {
  .popup-header {
    display: flex;
    padding: 8px 0.15rem;
    background: #eee;
    align-items: center;
    h4 {
      flex: 1 1 auto;
      font-weight: 500;
      font-size: 0.14rem;
      text-align: center;
    }
    .weui-btn_mini {
      padding: 0 0.6em;
      font-size: 0.12rem;
    }
  }
}
</style>
<style lang="less">
.mypoints {
  .weui-cells:before {
    border: none !important;
  }
  .weui-cells:before {
    border: none !important;
  }
  .weui-cells {
    font-size: 0.14rem !important;
  }
  .vux-no-group-title {
    line-height: 0.42rem !important;
    margin-top: 0 !important;
  }
  .weui-cell {
    padding: 0 15px !important;
  }
  .vux-popup-header-right {
    padding: 4px 8px;
    background-color: @primary-color;
    color: #fff !important;
  }
  .weui-textarea-counter {
    line-height: 1em;
    margin-bottom: 1em;
  }
  .weui-textarea {
    padding: 1em 0 !important;
    height: 3em;
    line-height: 1em;
  }
  .weui-btn_mini {
    padding: 0 0.6em !important;
  }
}
</style>
