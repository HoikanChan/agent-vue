<template>
  <div class="mypoints">
    <div class="mypoints_head">
      <img class="back" src="../../assets/images/back.png" /> 我的积分
    </div>
    <div class="point_body">
      <p>22222222
        <span>元</span>
      </p>
      <div class="detail">
        <div class="record">积分明细</div>
        <div class="deeded" @click="point">积分转让</div>
      </div>
    </div>
    <div class="date">
      <div class="time">
        <h3>本月</h3>
        <p>支出
          <span>220.00</span>
        </p>
        <p>收入
          <span>220.00</span>
        </p>
      </div>
      <div class="rili">
        <img src="../../assets/images/date.png" @click="timeShow=true" />
      </div>
    </div>
    <div class="all_recode">
      <p @click="show=true">{{pickedTypeTitle}}<img src="../../assets/images/style.png" /></p>
      <div class="months">
        <h4>{{pickedTime}}</h4>
        <p>支出
          <span>220.00</span>
        </p>
        <p>收入
          <span>220.00</span>
        </p>
      </div>
      <ul>
        <li v-for="(item,key) in records" :key="key">
          <p class="type">{{item.type}}
            <span>{{item.cost}}</span>
          </p>
          <div class="time_balance">
            <p class="clock">{{item.time}}
            </p>
            <span>剩余:
              <i>{{item.balance}}</i>
            </span>
          </div>
          <p class="pay">{{item.comment}}</p>
        </li>
      </ul>
    </div>
    <div class="shade" v-if="flag"></div>
    <div class="modal" v-if="flag">
      <h2>积分转让 <img src="../../assets/images/flase.png" @click="hide()" /></h2>
      <div class="proptype">
        <group>
          <x-input title="" v-model="phone" :required="true" placeholder="请输入对方手机号码" is-type="china-mobile"></x-input>
        </group>
        <group>
          <x-input title="" v-model="username" :required="true" placeholder="请输入对方昵称" type="text"></x-input>
        </group>
        <group>
          <x-input title="" v-model="text" :required="true" placeholder="请输入备注" type="text"></x-input>
        </group>
        <group>
          <x-input title="" v-model="points" :required="true" placeholder="请输入大于1的积分" type="number"></x-input>
        </group>
      </div>
      <x-button type="primary" action-type="submit" class="round-btn submit" @click.native="submit()">确定</x-button>
      <p>转让成功系统将自动发送消息</p>
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
            <x-button mini plain @click.native="timeShow=flase" style="background-color:#fff;border:1px solid #f4f4f4">取消</x-button>
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
import axios from 'axios'
import {
  XInput,
  XButton,
  Group,
  DatetimeView,
  Alert,
  Datetime,
  Popup,
  PopupHeader,
  TransferDom
} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XInput,
    Group,
    DatetimeView,
    XButton,
    Alert,
    Datetime,
    XButton,
    Popup,
    PopupHeader
  },
  data() {
    return {
      show: false,
      timeShow: false,
      phone: '',
      username: '',
      text: '',
      points: '',
      flag: false,
      pickedType: 'all',
      popupPickedType: 'all',
      pickedTime: '2018-01',
      popupPickedTime: '2018-01',
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
        { key: 'point', title: '积分充值' },
        { key: 'pay', title: '订单支付' },
        { key: 'bonus', title: '分成奖励' },
        { key: 'else', title: '其他' }
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
    typeChoosed() {
      this.show = false
      this.pickedType = this.popupPickedType
    },
    timeChoosed() {
      this.timeShow = false
      this.pickedTime = this.popupPickedTime
    },
    submit() {
      if (
        this.phone == '' ||
        this.username == '' ||
        this.text == '' ||
        this.points == ''
      ) {
        this.$vux.alert.show({
          title: '输入不能为空',
          content: '请重新输入',
          onShow() {
            console.log("Plugin: I'm showing")
          },
          onHide() {
            console.log("Plugin: I'm hiding")
          }
        })
      } else {
        var message = {
          phone: this.phone,
          username: this.username,
          text: this.text,
          points: this.points
        }
        axios
          .post('/user', message)
          .then(function(response) {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    point: function() {
      this.flag = true
    },
    hide: function() {
      this.flag = false
    },
    date: () => {
      this.$vux.datetime.show({
        value: '', // 其他参数同 props
        onHide() {
          const _this = this
        },
        onShow() {
          const _this = this
        }
      })
      this.$vux.datetime.hide()
    }
  }
}
</script>
<style lang="less" scoped>
.mypoints {
  .mypoints_head {
    width: 100%;
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
    height: 1.44rem;
    background: url('../../assets/images/point_bg.png') no-repeat center/cover;
    text-align: center;
    color: #fff;
    p {
      font-size: 0.26rem;
      padding-top: 0.42rem;
    }
    .detail {
      width: 45.6%;
      height: 0.26rem;
      margin-left: 27.2%;
      margin-top: 0.16rem;
      .record {
        width: 50%;
        height: 0.26rem;
        border-radius: 0.13rem 0 0 0.13rem;
        background: #5b50d3;
        float: left;
        line-height: 0.26rem;
        text-align: center;
      }
      .deeded {
        width: 50%;
        height: 0.26rem;
        line-height: 0.26rem;
        text-align: center;
        border-radius: 0 0.13rem 0.13rem 0;
        background: #fff;
        float: left;
        color: #000;
      }
    }
  }
  .date {
    height: 0.64rem;
    background: #5b50d3;
    margin-top: 0.1rem;
    padding: 0 4.8%;
    color: #fff;
    .time {
      width: 70%;
      height: 0.64rem;
      float: left;
      h3 {
        margin-top: 0.13rem;
        font-weight: normal;
        font-size: 0.14rem;
      }
      p {
        display: inline-block;
        margin-top: 0.02rem;
        width: 40%;
        span {
          padding-left: 10%;
        }
      }
    }
    .rili {
      width: 30%;
      height: 0.64rem;
      float: left;
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
      height: 0.35rem;
      line-height: 0.35rem;
      padding-left: 4.8%;
      font-size: 0.16rem;
      font-weight: bold;
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
        height: 0.95rem;
        padding: 0 4.8%;
        border-bottom: 1px solid #ccc;
        .type {
          padding-left: 0;
          padding-bottom: 0.08rem;
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
          height: 0.3rem;
          line-height: 0.3rem;
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
  .modal {
    position: absolute;
    z-index: 101;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 72%;
    height: 3.33rem;
    margin: auto;
    display: block;
    border-radius: 0.05rem;
    background: #fff;
    h2 {
      text-align: center;
      font-size: 0.18rem;
      margin-top: 0.27rem;
      position: relative;
      img {
        width: 0.35rem;
        height: 0.35rem;
        position: absolute;
        left: 82%;
        top: -0.2rem;
      }
    }
    .proptype {
      width: 75%;
      margin: 0.15rem auto;
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
      height: 0.27rem;
      line-height: 0.27rem;
      margin-top: 0.1rem;
      color: #999;
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
    display: flex;
    padding: 8px 0.15rem;
    background: #ddd;
    align-items: center;
    h4 {
      flex: 1 1 auto;
      font-weight: 500;
      font-size: 0.14rem;
      text-align: center;
    }
  }
}
</style>
<style lang="less">
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
  height: 0.42rem !important;
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
</style>


