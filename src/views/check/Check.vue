<template>
    <div class="check">
        <x-header :left-options="{backText: ''}">
            <span>升级</span>
        </x-header>
        <div class="upgrade">
            <div class="rank">
                <img class="face" src="../../assets/images/22.jpg" />
                <img class="grade" src="../../assets/images/rank.png" />
                <p>大区</p>
            </div>
            <div class="up">
                <img class="up_img" src="../../assets/images/up.png" />
                <span @click="upgrade">升级</span>
            </div>
        </div>
        <checker v-model="pickedId" default-item-class="demo2-item" selected-item-class="selected" radio-required>
            <checker-item v-for="(item,index) in upgradeList" :key="index" :value="item.levelId">
                <div class="option_referer">
                    <div class="option">
                        <div class="checkbox-wrapper">
                            <material-checkbox></material-checkbox>
                        </div>
                        <span>{{item.levelName}}</span>

                        <i>{{item.price}}</i>
                        <img src="../../assets/images/right.png" />
                    </div>
                    <div class="referer">
                        <div>
                            <p>审核人:
                                <span>{{item.name}}</span>
                            </p>
                            <p>手机号码:
                                <span>{{item.telNumber}}</span>
                            </p>
                            <p>注册等级:
                                <span>{{item.userLevelName}}</span>
                            </p>
                            <p>推荐人:
                                <span>{{item.referrerName}}</span>
                            </p>
                        </div>
                        <div>
                            <img src="../../assets/images/22.jpg" />
                        </div>
                    </div>
                </div>
            </checker-item>
        </checker>
        <h3 v-if="upgradeList.length === 0" style="text-align:center;margin-top:2em;">暂无升级内容</h3>
        <div class="shade" v-show="flag"></div>
        <div class="modal" v-show="flag">
            <p>等待审核</p>
            <p>审核结果将以系统消息通知</p>
            <div @click="close">我知道了</div>
        </div>
    </div>
</template>

<script>
import ApplyService from 'services/ApplyService'
import { XHeader, Checker, CheckerItem, Checklist } from 'vux'
import Checkbox from 'components/Checkbox'
export default {
  components: {
    CheckerItem,
    Checker,
    Checklist,
    XHeader,
    'material-checkbox': Checkbox
  },
  data() {
    return {
      flag: false,
      checked: true,
      pickedId: '',
      upgradeList: []
    }
  },
  async mounted() {
    this.update()
  },
  methods: {
    async upgrade() {
      if (!this.pickedId) {
        this.$vux.toast.show({
          width: '10em',
          type: 'warn',
          text: '请选择升级内容'
        })
        return
      }
      const result = await ApplyService.upgrade(this.pickedId)
      if (result.errno) {
        this.$vux.toast.show({
          width: '10em',
          type: 'warn',
          text: result.errmsg
        })
      } else {
        this.update()
        this.pickedId = ''
        this.flag = true
      }
    },
    async update() {
      const result = await ApplyService.getUpgradeList()
      if (result.data) {
        this.upgradeList = result.data
      }
    },
    close() {
      this.flag = false
    }
  }
}
</script>
<style lang="less" scoped>
.check {
  .check_head {
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
  .upgrade {
    width: 100%;
    height: 1.63rem;
    background: #5b50d3;
    .rank {
      width: 50%;
      height: 1.63rem;
      float: left;
      position: relative;
      .face {
        width: 0.54rem;
        height: 0.54rem;
        border: 1px solid #fff;
        border-radius: 50%;
        margin-left: 40.5%;
        margin-top: 0.32rem;
      }
      .grade {
        width: 1.06rem;
        height: 0.31rem;
        position: absolute;
        left: 27.2%;
        top: 0.74rem;
      }
      p {
        width: 0.7rem;
        height: 0.27rem;
        line-height: 0.27rem;
        color: #fff;
        position: absolute;
        left: 36.8%;
        top: 0.78rem;
        text-align: center;
        font-size: 0.15rem;
      }
    }
    .up {
      width: 50%;
      height: 1.63rem;
      float: left;
      position: relative;
      .up_img {
        width: 0.82rem;
        height: 0.82rem;
        margin-left: 28.8%;
        margin-top: 0.33rem;
      }
      span {
        width: 0.42rem;
        height: 0.42rem;
        line-height: 0.42rem;
        text-align: center;
        position: absolute;
        color: #5b50d3;
        left: 39.2%;
        top: 0.53rem;
      }
    }
  }
  .option_referer {
    .option {
      padding: 0 4.8%;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
      .checkbox-wrapper {
        float: left;
      }
      span {
        height: 0.53rem;
        line-height: 0.53rem;
        font-size: 0.13rem;
        flex: 1 1 auto;
      }
      img {
        width: 0.07rem;
        height: 0.13rem;
      }
      i {
        padding-right: 3%;
        color: #5b50d3;
      }
    }
    .referer {
      width: 88%;
      margin: 0.1rem auto;
      border-radius: 0.04rem;
      overflow: hidden;
      > div {
        &:nth-child(1) {
          width: 70%;
          height: 1.1rem;
          float: left;
          p {
            height: 0.27rem;
            line-height: 0.27rem;
            font-size: 0.13rem;
            padding-left: 6%;
            font-weight: bold;
          }
          &:nth-child(1) {
            margin-top: 0.15rem;
          }
        }
        &:nth-child(2) {
          width: 30%;
          height: 1.1rem;
          float: left;
          img {
            width: 0.3rem;
            height: 0.3rem;
            border-radius: 0.02rem;
            margin-top: 0.23rem;
            margin-left: 47%;
          }
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
    width: 77.6%;
    height: 1.64rem;
    margin: auto;
    display: block;
    border-radius: 0.08rem;
    background: #fff;
    p {
      text-align: center;
      font-size: 0.13rem;
      color: #333;
      margin-top: 0.1rem;
      &:first-child {
        font-size: 0.19rem;
        font-weight: bold;
        color: #000;
        margin-top: 0.27rem;
      }
    }
    > div {
      width: 39%;
      height: 0.3rem;
      line-height: 0.3rem;
      background: #5b50d3;
      text-align: center;
      color: #fff;
      border-radius: 0.03rem;
      margin: 0.3rem auto;
    }
  }
}
</style>
<style lang="less">
.check {
  .vux-checker-item {
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #ccc;
  }
}
</style>

