<template>
  <div class="authorization">
    <x-header :left-options="{backText: ''}" style="border-bottom:1px solid #eee;">
      <span>我的授权书</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
    </x-header>
    <div class="authorize">
      <img v-if="img" :src="img" />
      <div class="animate" v-else style="text-align:center;">
         <!-- {{errorMsg || '暂无数据'}} -->
         <div class="flash"><img src="../../assets/images/authorization.png" /></div>
         <img style="width:.75rem,height:auto;" src="../../assets/images/shadow.png" />
         <p style="margin-top:.45rem;">您尚未实名认证</p>
         <p>暂无授权书</p>
         <div class="certification" @click="go"> 去认证</div>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux'
import AuthService from 'services/AuthenticationService'

export default {
  data() {
    return {
      img: '',
      errorMsg: ''
    }
  },
  methods: {
    go() {
      // debugger
      this.$router.push({ name: 'realName' })
    }
  },
  components: {
    XHeader
  },
  async activated() {
    const result = await AuthService.getAuthorization()
    if (result.errno) {
      this.$vux.toast.show({
        width: '15em',
        type: 'warn',
        text: result.errmsg
      })
      this.errorMsg = result.errmsg
      return
    }
    this.img = result.data.picUrl || null
  }
}
</script>
<style lang='less' scoped>
.authorization {
  .authorize {
    img {
      width: 100%;
      height: auto;
    }
    .animate {
      .flash {
        //    animation:Updown 0.5s infinite alternate;
        // -webkit-animation:Updown 0.5s alternate infinite;/*infinite无限播放，alternate轮流反向播放*/
        img {
          width: 0.85rem;
          height: auto;
          margin-top: 1.06rem;
        }
        // @keyframes Updown{
        // from{margin-top:30px;}
        // to{margin-top:10px;}
        // }
        // @-webkit-keyframes Updown{
        // from{margin-top:30px;}
        // to{margin-top:10px;}
        // }
      }
      img {
        width: 0.75rem;
        height: auto;
        margin-top: 0.2rem;
      }
      p {
        font-size: 0.15rem;
        &:first-child {
          padding-top: 0.45rem;
        }
      }
      .certification {
        width: 90.4%;
        height: 0.44rem;
        line-height: 0.44rem;
        background: #5b50d3;
        border: none;
        border-radius: 0.03rem;
        font-size: 0.16rem;
        color: #fff;
        margin-top: 1rem;
        margin-left: 4.8%;
      }
    }
  }
}
</style>
