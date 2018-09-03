<template>
  <div class="realname-container">
    <x-header :left-options="{backText: ''}" style="border-bottom: 1px solid #ccc ;">
      系统消息
      <a slot="right" type="more" size="35" style="color:#5b50d3">清空</a>
    </x-header>
    <div class="content">
      <div class="item" v-for="(item,index) in messages" :key="index">
        <img src="../../assets/images/sys_msg.png" alt="">
        <span>
          <div class="headbar">
            <div class="type">{{item.type}}</div>
            <div class="time">{{item.time}}</div>
          </div>
          <div class="content">
            <div class="title">{{item.title}}</div>
            <div class="msg-content">{{item.content}}</div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
  name: 'Login',
  components: {
    XHeader
  },
  data: function() {
    return {
      messages: [
        {
          type: '系统消息',
          title: '积分充值',
          content: '平台送钱啦~~~~~~~~~~~~~~~~~~~~~~',
          time: '2018-8-14 16:26：30'
        },
        {
          type: '系统消息',
          title: '积分充值',
          content: '平台送钱啦~~~~~~~~~~~~~~~~~~~~~~',
          time: '2018-8-14 16:26：30'
        },
        {
          type: '系统消息',
          title: '积分充值',
          content: '平台送钱啦~~~~~~~~~~~~~~~~~~~~~~',
          time: '2018-8-14 16:26：30'
        },
        {
          type: '系统消息',
          title: '积分充值',
          content: '平台送钱啦~~~~~~~~~~~~~~~~~~~~~~',
          time: '2018-8-14 16:26：30'
        },
        {
          type: '系统消息',
          title: '积分充值',
          content: '平台送钱啦~~~~~~~~~~~~~~~~~~~~~~',
          time: '2018-8-14 16:26：30'
        }
      ]
    }
  },
  methods: {
    register() {
      if (this.$refs.realname.valid && this.$refs.idCard.valid) {
        console.log('login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  background: #fff;
  padding: 0.25rem 0.2rem;
  margin-bottom: 0.08rem;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 5px 1px -1px rgba(0, 0, 0, 0.12);

  img {
    width: 0.5rem;
    height: 0.5rem;
  }
  span {
    flex: 1 1 auto;
    margin-left: 0.2rem;
    font-size: 0.14rem;

    .headbar {
      height: 0.5rem;
      display: inline-flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      .type {
        font-size: 0.17rem;
        color: #333;
      }
      .time {
        color: #a9a9a9;
      }
    }
    .content {
      margin-top: 0.1rem;
      padding: 0.1rem;
      border-radius: 3px;
      background-color: #f2f2f2;
      .title {
        color: @primary-color;
      }
      .msg-content {
        color: #828282;
      }
    }
  }
}
</style>
