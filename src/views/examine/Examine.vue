<template>
  <div class="examine">
    <x-header :left-options="{backText: ''}">
      <span>审核</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
      </x-header>
      <div class="tab">
        <div @click="tabNow='register'">
          <img src="../../assets/images/register_check.png" v-if="tabNow==='register'" />
          <img src="../../assets/images/register_check_.png" v-else/>
          <p>我的申请</p>
          <badge :text="applyList.length" class="badge"></badge>
        </div>
        <div @click="tabNow='upgrade'">
          <img src="../../assets/images/upgrade_check.png" v-if="tabNow==='upgrade'" />
          <img src="../../assets/images/upgrade_check_.png" v-else/>
          <p>我的审核</p>
          <badge :text="auditList.length" class="badge"></badge>
        </div>
      </div>
      <div class="tab-wrapper" v-show="tabNow==='register'">
        <div v-for="item in applyList" :key="item.id" class="tab-content">
          <div class="tab-text">
            <div>
              <p>审核人:
                <span>{{item.auditUserName}}</span>
              </p>
              <p>手机号码:
                <span>{{item.auditUserTel}}</span>
              </p>
              <p v-if=" item.levelName">升级等级:
                <span>{{item.levelName|| '无'}}</span>
              </p>
              <p>订单类型:
                <span>{{item.orderTypeText || '无'}}</span>
              </p>
              <p>申请积分数:
                <span>{{item.credit ===null? '无':item.credit }}</span>
              </p>
              <p>审核状态:
                <span>{{item.statusText|| '无'}}</span>
              </p>
              <p>时间：
                <span>{{item.createTime || '无'}}</span>
              </p>
            </div>
            <div>
              <img :src="item.auditUserAvatar" />
          </div>
            </div>
            <div class="tab-img" style="text-align:center;position:relative">
              <spinner type="bubbles" size="40" style="position:absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);"></spinner>
              <p>审核凭证：</p>
              <x-img :src="item.payPic" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container=".tab-wrapper"></x-img>
            </div>
          </div>
          <h3 v-if="applyList.length === 0" style="text-align:center;padding:0.5rem;"> 暂无记录</h3>
        </div>
        <div class="tab-wrapper" v-show="tabNow==='upgrade'">
          <div v-for="item in auditList" :key="item.id" class="tab-content">
            <div class="tab-text">
              <div>
                <p>申请人:
                  <span>{{item.applyUserName}}</span>
                </p>
                <p>手机号码:
                  <span>{{item.applyUserTel}}</span>
                </p>
                <p v-if=" item.levelName">升级等级:
                  <span>{{item.levelName|| '无'}}</span>
                </p>
                <p>订单类型:
                  <span>{{item.orderTypeText || '无'}}</span>
                </p>
                <p>申请积分数:
                  <span>{{item.credit ===null? '无':item.credit }}</span>
                </p>
                <p>审核状态:
                  <span>{{item.statusText|| '无'}}</span>
                </p>
                <p>时间：
                  <span>{{item.createTime || '无'}}</span>
                </p>
              </div>
              <div>
                <img :src="item.applyUserAvatar" />
              </div>
              </div>
              <div class="tab-img" style="text-align:center;position:relative">
                <spinner type="bubbles" size="40" style="position:absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);"></spinner>
                <x-button class="check-btn" mini plain type="primary" @click.native="aduitModalShow(item.id)">审核</x-button>
                <p>审核凭证：</p>
                <br/>
                <x-img :src="item.payPic" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container=".tab-wrapper"></x-img>
              </div>
            </div>
            <h3 v-if="auditList.length === 0" style="text-align:center;padding:0.5rem;"> 暂无记录</h3>
          </div>
          <div class="shade" v-show="modalShow"></div>
          <div class="modal" v-show="modalShow">
            <h2>审核 <img src="../../assets/images/flase.png" @click="modalShow=false" /></h2>
              <div class="proptype">
                <br>
                <checker v-model="auditForm.orderStatus" default-item-class="demo2-item" selected-item-class="selected" radio-required>
                  <checker-item v-for="(item,index) in status" :key="index" :value="item.value">
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
                <group>
                  <x-textarea title="" :max="100" v-model="auditForm.postscript" placeholder="请输入留言" type="text"></x-textarea>
                </group>
              </div>
              <x-button type="primary" action-type="submit" class="round-btn submit" @click.native="audit()">确定</x-button>
          </div>
        </div>
</template>
<script>
import ApplyService from 'services/ApplyService'
import Checkbox from 'components/Checkbox'
import {
  XHeader,
  XInput,
  XTextarea,
  Group,
  XButton,
  Badge,
  XDialog,
  XImg,
  Checker,
  CheckerItem,
  Spinner,
  TransferDomDirective as TransferDom
} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    XInput,
    XTextarea,
    Group,
    XButton,
    Badge,
    XDialog,
    XImg,
    Checker,
    CheckerItem,
    Spinner,
    'material-checkbox': Checkbox
  },
  data() {
    return {
      tabNow: 'register',
      auditList: [],
      applyList: [],
      modalShow: false,
      auditId: null,
      auditStatus: 1,
      status: [
        { title: '审核通过', value: 1 },
        { title: '审核不通过', value: 0 }
      ],
      auditForm: {
        orderStatus: '',
        postscript: ''
      }
    }
  },

  methods: {
    success(src, ele) {
      const span = ele.parentNode.querySelector('span')
      ele.parentNode.removeChild(span)
    },
    error(src, ele, msg) {
      const span = ele.parentNode.querySelector('span')
      span.innerText = '没有上传审核凭证...'
    },
    aduitModalShow(id) {
      this.auditId = id
      this.modalShow = true
    },
    async update() {
      const auditList = (await ApplyService.auditList()).data
      this.auditList = auditList
      const applyList = (await ApplyService.applyList()).data
      this.applyList = applyList
    },
    async audit() {
      const result = await ApplyService.audit({
        applyOrderId: this.auditId,
        ...this.auditForm
      })
      this.$vux.toast.show({
        width: '15em',
        type: result.errno ? 'warn' : 'success',
        text: result.errmsg
      })
      this.modalShow = false
      this.update()
    }
  },
  async mounted() {
    await this.update()
  }
}
</script>
<style lang="less" scoped>
.vux-x-img,
.b-lazy {
  max-width: 82%;
}
.examine {
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
    position: fixed;
    z-index: 101;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 72%;
    height: 3.4rem;
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
    .detail {
      display: flex;
      align-items: center;
      width: 100%;
      margin-right: 3em;
      margin-bottom: 1em;
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
  }
  .tab-wrapper {
    padding-bottom: 1rem;
    background: #f6f6f6;
  }
  .tab {
    width: 100%;
    height: 1.1rem;
    border-top: 1px solid #eee;
    background: #fff;
    display: flex;
    box-shadow: -2px 2px 2px #e5e5e5;
    > div {
      width: 50%;
      position: relative;
      height: 1.1rem;
      text-align: center;
      .badge {
        position: absolute;
        top: 0.23rem;
        right: 0.66rem;
      }
      img {
        margin-top: 0.3rem;
      }
      &:first-child {
        img {
          width: 0.4rem;
          height: 0.37rem;
        }
      }
      &:nth-child(2) {
        img {
          width: 0.39rem;
          height: 0.37rem;
        }
      }
    }
  }
  .tab-content {
    width: 88%;
    margin: 0.1rem auto;
    border-radius: 0.04rem;
    overflow: hidden;
    background: #fff;
    box-shadow: 0px 4px 10px 0px #d3d0d0;
    border-bottom: 1px solid #eee;
    .tab-img {
      padding: 0 1em;
      position: relative;
      .check-btn {
        position: absolute;
        right: 1em;
        top: 0.2em;
      }
      p {
        text-align: left;
        font-size: 0.13rem;
        font-weight: 500;
        height: 0.28rem;
        line-height: 0.28rem;
        margin-bottom: 0.12rem;
      }
    }
    .ximg-demo {
      min-width: 82%;
      height: auto;
      margin-bottom: 0.23rem;
      border-radius: 0.04rem;
    }

    .tab-text {
      display: flex;
      > div {
        &:first-child {
          width: 70%;
          p {
            height: 0.27rem;
            line-height: 0.27rem;
            font-size: 0.13rem;
            padding-left: 6%;
            font-weight: 500;
            &:nth-child(1) {
              margin-top: 0.15rem;
            }
          }
        }
        &:nth-child(2) {
          width: 30%;
          height: 1.1rem;
          img {
            width: 0.35rem;
            height: 0.35rem;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              10px 10px 10px 0px rgba(189, 188, 188, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            // border-radius: 50%;
            margin-top: 0.15rem;
            margin-left: 45%;
          }
          button {
            margin-left: 38%;
            margin-top: 0.7rem;
          }
        }
      }
    }
  }
}
.show {
  color: #5b50d3;
}
.weui-btn_mini {
  padding: 0 0.1rem;
  line-height: 0.2rem;
}
</style>
<style lang="less">
.examine {
  .vux-spinner {
    height: auto;
    width: auto;
  }
  .ximg-error {
    background-color: yellow;
  }
  .ximg-error:after {
    content: '加载失败';
    color: red;
  }
}
</style>
