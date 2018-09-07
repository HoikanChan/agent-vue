<template>
  <div class='teamsearch'>
    <div class="search">
      <img @click="$router.push({name:'myteam'})" style="width:.12rem;height:.21rem;margin-left:4.8%;" src="../../assets/images/back.png" />
      <input type="text" placeholder="搜索成员" v-model='keyword' />
      <span @click='search()'>确定</span>
    </div>
    <div class="detail" v-for="(member,index) in members" :key="index" style="border-bottom: solid 1px #fff;">
      <div class="one">
        <img :src="member.avatar" />
        <p>{{member.username}}</p>
      </div>
      <div class="two">
        <p class="phone">手机号码：
          <span>{{member.mobile}}</span>
        </p>
        <p>代理等级：
          <span>{{member.userLevelName}}</span>
        </p>
        <p>注册时间：
          <span>{{member.registerTime}}</span>
        </p>
        <p>本月业绩: &nbsp
          <span>{{member.currentPerformance ||'0.00'}}</span>
        </p>
        <p>累计业绩: &nbsp
          <span>{{member.performance ||'0.00'}}</span>
        </p>
      </div>
    </div>
    <p v-if='hide' style='text-align:center;'>未搜索到相关成员</p>
  </div>
</template>

<script>
import TeamService from 'services/TeamService'
import { debounce } from 'vux'

export default {
  data() {
    return {
      keyword: '',
      members: [],
      hide: true
    }
  },
  watch: {
    keyword: debounce(async function() {
      this.search()
    }, 300)
  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      TeamService.search(this.keyword).then(res => {
        this.members = res.data || []
        this.hide = res.data.length === 0
      })
    }
  }
}
</script>
<style lang="less" scoped>
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
