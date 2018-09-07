<template>
  <div class="member">
    <div class="team_head">
      <a href="javascript:;" onClick="javascript:history.back(-1);"><img class="back" src="../../assets/images/back.png" /></a>
      {{info.username}}
    </div>
    <div class="detail">
      <div class="one">
        <img :src="info.avatar" />
        <p>{{info.username}}</p>
      </div>
      <div class="two">
        <p class="phone">手机号码:
          <span>{{info.mobile}}</span>
        </p>
        <p>代理等级:
          <span>{{info.userLevelName}}</span>
        </p>
        <p>注册时间:
          <span>{{info.registerTime}}</span>
        </p>
        <p>本月业绩:
          <span>{{info.currentPerformance ||'0.00'}}</span>
        </p>
        <p>累计业绩:
          <span>{{info.performance ||'0.00'}}</span>
        </p>
      </div>
    </div>
    <div class="level">
      <a to="#" @click="switchTab(key,item)" v-for="(item,key,index) in member" :key="key" v-on:click="addClass(index)" v-bind:class="{ active:index==current}">
        <p class="first">{{item.count}}</p>

        <p class="second">{{key}}</p>
      </a>
    </div>
    <div>
      <ul class="members">

        <li v-for="(item,key) in pickedTeam" :key="key" :value='item.id'>
          <img class="jpg" src="../../assets/images/15.jpg" />
          <span>{{item.username}}</span>
          <img class="right" src="../../assets/images/right.png" />
        </li>

      </ul>
      <div v-if="pickedTeam.length === 0" style="text-align:center"> 暂时没有数据</div>
    </div>
  </div>
</template>

<script>
import TeamService from 'services/TeamService'

export default {
  data() {
    return {
      member: [],
      pickedTeam: [],
      current: 0,
      info: {}
    }
  },
  mounted() {
    let id = this.$route.params.id
    TeamService.childInfo(id).then(res => {
      if (res.data) {
        this.info = res.data['performance']
        delete res.data.performance
        this.member = res.data
        this.pickedTeam = this.member[this.current].users || []
      }
    })
  },
  methods: {
    switchTab(tabName, item) {
      this.pickedTeam = item.users
      this.tabNow = tabName
    },
    addClass: function(index) {
      this.current = index
    }
  }
}
</script>
<style lang="less" scoped>
.active {
  color: #5b50d3;
}
.member {
  .team_head {
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
      height: 1.52rem;
      float: left;
      .phone {
        margin-top: 0.28rem;
      }
      p {
        color: #fff;
        margin-left: 15.1%;
        margin-top: 0.01rem;
        font-size: 0.13rem;
        span {
          // padding-left: 1%;
        }
      }
    }
  }
  .level {
    width: 100%;
    height: 0.71rem;
    background: #fff;
    a {
      display: block;
      width: 24.7%;
      height: 0.4rem;
      float: left;
      text-align: center;
      border-right: 1px solid #ccc;
      margin-top: 0.15rem;
      font-size: 0.13rem;
      .first {
        height: 0.17rem;
        line-height: 0.17rem;
      }
      .second {
        height: 0.22rem;
        line-height: 0.22rem;
        margin-top: 0;
      }
      &:last-child {
        border-right: none;
      }
    }
    .none {
      border-right: none;
    }
  }
  .members {
    background: #fff;
    margin-top: 0.1rem;
    li {
      height: 0.53rem;
      line-height: 0.53rem;
      border-bottom: 1px solid #ccc;
      padding: 0 4.8%;
      .jpg {
        width: 0.33rem;
        height: 0.33rem;
        border-radius: 50%;
      }
      span {
        margin-top: 0.2rem;
        margin-left: 2%;
      }
      .right {
        width: 0.09rem;
        height: 0.16rem;
        margin-top: 0.19rem;
      }
    }
  }
}
</style>
