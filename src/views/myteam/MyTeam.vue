<template>
  <div class="myteam">
    <x-header :left-options="{backText: ''}" >
      <span>我的团队</span>
      <img slot="overwrite-left" src="../../assets/images/back.png" size="25" style="width:.09rem;height:auto;position:relative;top:-2px;" @click="$router.push({name:'user'})">
      <!-- <x-icon slot="right" type="more" size="35" style="fill:#333;position:relative;top:-8px;left:-3px;"></x-icon> -->
    </x-header>
    <div class="agency">
      <input @click="$router.push({name:'teamsearch'})" type="text" placeholder="搜索代理名称" />
      <img class="img" src="../../assets/images/team_search.png" />
      <div class="realtion">
        <p class="man">我的推荐人</p>
        <img class="head" :src="referrer.avatar" />
        <p class="mantwo">{{referrer.username}}</p>
      </div>
      <img class="relate" src="../../assets/images/relation.png" />
      <div class="realtion_">
        <p class="man_">直属上级</p>
        <img class="head_" :src="direct.avatar" />
        <p class="mantwo_">{{direct.username}}</p>
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
          <div @click="viewChild(item.id)">
            <img class="jpg" :src="item.avatar" />
            <span>{{item.username}}</span>
            <img class="right" src="../../assets/images/right.png" />
          </div>
        </li>
      </ul>
      <div v-if="pickedTeam.length === 0" style="text-align:center">
        <img src="../../assets/images/noman.png" style="width:.44rem;height:auto;margin-top:.84rem;" />
        <p style="font-size:.15rem;color:#9890ec;margin-top:.16rem;">暂无成员</p>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux'
import TeamService from 'services/TeamService'

export default {
  data() {
    return {
      msg: '我的团队',
      list: [],
      tabNow: '官方合伙人',
      pickedTeam: {},
      referrer: '',
      direct: '',
      member: [],
      current: 0
    }
  },
  components: {
    XHeader
  },
  methods: {
    switchTab(tabName, item) {
      this.pickedTeam = item.users
      this.tabNow = tabName
    },
    addClass: function(index) {
      this.current = index
    },
    viewChild(id) {
      this.$router.push({
        name: 'member_detail',
        params: {
          id: id
        }
      })
    }
  },
  mounted() {
    TeamService.getReferrer().then(response => {
      this.referrer = response.data
      TeamService.getParent().then(res => {
        this.direct = res.data
      })
      TeamService.getChildren().then(result => {
        this.member = result.data
        this.pickedTeam = this.member[this.tabNow].users
      })
    })
  }
}
</script>
<style lang="less">
.active {
  color: #5b50d3;
}
.myteam {
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
  .agency {
    width: 100%;
    height: 1.78rem;
    background: #5b50d3;
    position: relative;
    input {
      display: inline-block;
      width: 46.2%;
      height: 0.28rem;
      line-height: 0.28rem;
      background: #fff;
      margin-top: 0.25rem;
      margin-left: 11.4%;
      padding-left: 31%;
      border-radius: 0.03rem;
      font-family: '苹方';
      font-size: 0.13rem;
    }
    .img {
      width: 0.16rem;
      height: 0.16rem;
      position: absolute;
      left: 37%;
      top: 0.3rem;
    }
    .realtion {
      width: 21.4%;
      height: 0.77rem;
      margin-left: 19.2%;
      margin-top: 0.07rem;
      text-align: center;
      float: left;
      font-size: 0.13rem;
      .man {
        color: #fff;
        height: 0.32rem;
        line-height: 0.32rem;
      }
      .head {
        width: 0.41rem;
        height: 0.41rem;
        position: inherit;
        border-radius: 50%;
        border: 0.01rem solid #fff;
      }
      .mantwo {
        color: #fff;
        height: 0.24rem;
        line-height: 0.24rem;
      }
    }
    .relate {
      float: left;
      width: 0.46rem;
      height: 0.15rem;
      margin-top: 0.44rem;
      margin-left: 3.3%;
    }
    .realtion_ {
      width: 21.4%;
      height: 0.77rem;
      margin-left: 3.3%;
      margin-top: 0.07rem;
      text-align: center;
      float: left;
      font-size: 0.13rem;
      .man_ {
        color: #fff;
        height: 0.32rem;
        line-height: 0.32rem;
      }
      .head_ {
        width: 0.41rem;
        height: 0.41rem;
        position: inherit;
        border-radius: 50%;
        border: 0.01rem solid #fff;
      }
      .mantwo_ {
        color: #fff;
        height: 0.24rem;
        line-height: 0.24rem;
      }
    }
  }
  .level {
    width: 100%;
    height: 0.71rem;
    background: #fff;
    box-shadow: 0px 0px 10px #c2bfbf;
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
      border-top: 1px solid #eee;
      padding: 0 4.8%;
      &:first-child {
        border-top: none;
      }
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
