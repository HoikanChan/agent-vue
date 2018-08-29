<template>
  <div class="examine">
    <x-header :left-options="{backText: ''}">审核</x-header>
    <div class="tab">
      <div @click="tabNow='register'">
        <img src="../../assets/images/register_check.png" v-if="tabNow==='register'" />
        <img src="../../assets/images/register_check_.png" v-else/>
        <p>注册审核</p>
        <badge text="8" class="badge"></badge>
      </div>
      <div @click="tabNow='upgrade'">
        <img src="../../assets/images/upgrade_check.png" v-if="tabNow==='upgrade'" />
        <img src="../../assets/images/upgrade_check_.png" v-else/>
        <p>升级审核</p>
        <badge text="8" class="badge"></badge>
      </div>
    </div>
    <div class="tab-content" v-show="tabNow==='register'">
      <div>
        <p>审核人:<span>茉莉</span></p>
        <p>手机号码:<span>15797964844</span></p>
        <p>注册等级:<span>总代</span></p>
        <p>推荐人:<span>陈洋</span></p>
      </div>
      <div>
        <img src="../../assets/images/22.jpg" />
        <button>审核</button>
      </div>
    </div>
    <div class="tab-content" v-show="tabNow==='upgrade'">
      <div>
        <p>审核人:<span>茉莉</span></p>
        <p>手机号码:<span>15797964844</span></p>
        <p>升级等级:<span>总代</span></p>
        <p>推荐人:<span>陈洋</span></p>
      </div>
      <div>
        <img src="../../assets/images/22.jpg" />
        <button>审核</button>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { XHeader, Badge } from 'vux'
export default {
  data() {
    return {
      tabNow: 'register'
    }
  },
  components: {
    XHeader,
    Badge
  }
}
</script>
<style lang="less" scoped>
.examine {
  .tab {
    width: 100%;
    height: 1.1rem;
    border-top: 1px solid #ccc;
    background: #fff;
    display: flex;
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
  .tab-content{
        width: 88%;
        height:5.12rem;
        margin: .1rem auto;
        border-radius: .04rem;
        box-shadow: -2px 2px 2px #e5e5e5;
        border-bottom: 1px solid #ccc;
    >div{
      &:first-child{
            width: 70%;
            height: 1.1rem;
            float: left;
             p{
                height: .27rem;
                line-height: .27rem;
                font-size: .13rem;
                padding-left: 6%;
                font-weight: bold;
            }
      }
      &:nth-child(2){
          width: 30%;
          height: 1.1rem;
          float: left;
          img{
            width: .3rem;
            height: .3rem;
            border-radius: .02rem;
            margin-top: .23rem;
            margin-left: 47%;
          }
          button{
            width: .44rem;
            height: .2rem;
            border: 1px solid #5b50d3;
            text-align: center;
            line-height: .2rem;
            background: #fff;
            border-radius: .03rem;
            color: #5b50d3;
            margin-left: 39%;
            margin-top: .35rem;
          }
      }
    }
  }
}
.show {
  color: #5b50d3;
}
</style>


