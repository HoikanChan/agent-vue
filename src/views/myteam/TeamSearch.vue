<template>
    <div class='teamsearch'>
        <div class="search">
            <img @click="$router.push({name:'myteam'})" style="width:.12rem;height:.21rem;margin-left:4.8%;" src="../../assets/images/back.png" />
            <input type="text" placeholder="搜索成员" v-model='text' />
            <span v-if='abandon' @click='search_member()'>确定</span>
        </div>
        <div class="detail" v-if='show'>
            <div class="one">
                <img src="../../assets/images/4.jpg" />
                <p>余生不送</p>
            </div>
            <div class="two">
                <p class="phone">手机号码:
                    <span>{{message.mobile}}</span>
                </p>
                <p>代理等级:
                    <span>总代</span>
                </p>
                <p>注册时间:
                    <span>2017-10-12</span>
                </p>
                <p>本月业绩:
                    <span>222222.00</span>
                </p>
                <p>累计业绩:
                    <span>8888888.00</span>
                </p>
            </div>
        </div>
        <p v-if='hide' style='text-align:center;'>未搜索到相关成员</p>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      msg: '用户',
      text: '',
      abandon: true,
      show: false,
      message: [],
      hide: true
    }
  },
  mounted() {},
  methods: {
    search_member() {
      var text = this.text
      var show = this.show
      axios
        .get(
          'http://124.200.40.10:17080/agent/api/v1/team/search?keyword=' + text
        )
        .then(res => {
          console.log(res)
          if (res.data.data === '') {
            this.hide = true
          } else {
            this.message = res.data.data[0]
            this.show = true
            this.hide = false
          }
        })
    }
  }
}
</script>
<style lang="less">
@color_1: #b3b3b3;
@color_2: #000;
.teamsearch {
  .search {
    width: 100%;
    height: 0.44rem;
    background: #f6f6f6;
    input {
        width: 59%;
        height: 0.28rem;
        background: #e7e7e7;
        margin: 0.08rem auto;
        margin-left: 4%;
        border-radius: 0.025rem;
        color: @color_1;
        padding-left: 14%;
    }
    span {
      color: @color_2;
      font-weight: bold;
      padding-left: 1.5%;
    }
  }
  .team_head {
    width: 100%;
    height: 0.44rem;
    text-align: center;
    padding: 0 4.8%;
    line-height: 0.44rem;
    font-size: 0.16rem;
    color: #000;
    .back {
      float: left;
      width: 0.1rem;
      height: 0.16rem;
      margin-top: 0.15rem;
    }
    .cash {
      float: right;
      width: 0.2rem;
      height: 0.2rem;
      margin-top: 0.12rem;
      margin-right: 0.01rem;
    }
  }
  .detail {
    width: 100%;
    height: 1.53rem;
    background: #5b50d3;
    .one {
      width: 40%;
      height: 1.53rem;
      float: left;
      img {
        width: 0.62rem;
        height: 0.62rem;
        border-radius: 50%;
        border: 1px solid #fff;
        margin-left: 30%;
        margin-top: 0.35rem;
      }
      p {
        text-align: center;
        color: #fff;
        font-size: 0.15rem;
      }
    }
    .two {
      width: 60%;
      height: 1.53rem;
      float: left;
      .phone {
        margin-top: 0.28rem;
      }
      p {
        color: #fff;
        margin-left: 15.1%;
        margin-top: 0.01rem;
        font-size: 0.12rem;
      }
    }
  }
}
</style>