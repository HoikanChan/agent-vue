<template>
    <div class="teamcash">
        <x-header :left-options="{backText: ''}">
            <span>团队业绩</span>
            <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.back(-1)">
        </x-header>
        <div class="cash_point">
            <p class="all">总业绩</p>
            <p class="money">{{performance.performance}}
                <span>元</span>
            </p>
        </div>
        <ul class="team_grades">

            <li class="first_month" v-for="(item,index) in teamcash" style="margin-bottom:0.5em;  box-shadow: -2px 2px 2px #e5e5e5;">{{item.months}}团队业绩
                <span>{{item.credit}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
import { XHeader } from 'vux'
export default {
  data() {
    return {
      performance: [],
      teamcash: []
    }
  },
  components: {
    XHeader
  },
  mounted() {
    axios
      .get('http://sdl.cwzbz.com/agent/api/v1/performance/info')
      .then(res => {
        // console.log(res)
        this.performance = res.data.data
      })
    axios
      .get('http://sdl.cwzbz.com/agent/api/v1//performance/recordList')
      .then(response => {
        // console.log(response)
        this.teamcash = response.data.data
      })
  }
}
</script>
<style lang="less">
.teamcash {
  .teamcash_head {
    height: 0.44rem;
    line-height: 0.44rem;
    text-align: center;
    font-size: 0.18rem;
    padding: 0 4.8%;
    .back {
      float: left;
      width: 0.1rem;
      height: 0.16rem;
      margin-top: 0.15rem;
    }
  }
  .cash_point {
    width: 100%;
    height: 1.6rem;
    background: url('../../assets/images/team_bg.png') no-repeat center/cover;
    text-align: center;
    color: #fff;
    .all {
      padding-top: 0.44rem;
      font-size: 0.15rem;
    }
    .money {
      font-size: 0.18rem;
      padding-top: 0.05rem;
      font-weight: bold;
    }
  }
  .team_grades {
    width: 100%;
    margin-top: 0.1rem;
    .first_month {
      margin-top: 0;
    }
    li {
      height: 0.47rem;
      padding: 0 4.8%;
      background: #fff;
      margin-top: 0.05rem;
      line-height: 0.47rem;
      font-size: 0.13rem;
      font-weight: bold;
      span {
        float: right;
      }
    }
  }
}
</style>
