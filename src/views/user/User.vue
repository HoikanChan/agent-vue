<template>
  <div class="user">
    <div class="head">
      <div><img :src="$store.getters.getUser.avatar || defaultAvatar" alt=""></div>
      <p>{{$store.getters.getUser.nickname}}</p>
      <p>{{$store.getters.getUser.userLevelName}}</p>
      <router-link to="/userSetting"><img class="set" src="../../assets/images/set.png" /></router-link>
      <!-- <router-link to="/messages"><img style="width:.2rem;height:.21rem;" class="code_" src="../../assets/images/message.png" /></router-link> -->
    </div>
    <div class="all">
      <ul class="user_all">
        <li @click="$router.push({name:'myorder'})">
          <img src="../../assets/images/orderlist.png" />
          <p>我的订单</p>
        </li>
        <li @click="$router.push({name:'myteam'})">
          <img src="../../assets/images/team_user.png" />
          <p>我的团队</p>
        </li>
        <li @click="$router.push({name:'teamcash'})">
          <img src="../../assets/images/team_point.png" />
          <p>团队业绩</p>
        </li>
        <li @click="$router.push({name:'mypoints'})">
          <img src="../../assets/images/point_user.png" />
          <p>我的积分</p>
        </li>
        <!-- <li>
          <img src="../../assets/images/book.png" />
          <p>授权书</p>
        </li> -->
        <li @click="$router.push({name:'mycode'})">
          <img src="../../assets/images/code_user.png" />
          <p>推广码</p>
        </li>
        <li @click="$router.push({name:'shoppingCart'})">
          <img src="../../assets/images/shopcart.png" />
          <p>购物车</p>
        </li>
        <li @click="$router.push({name:'upgrade'})">
          <img src="../../assets/images/upgrade.png" />
          <p>升级</p>
        </li>
        <!-- <li>
          <img src="../../assets/images/cash_user.png" />
          <p>押金</p>
        </li>
        <li>
          <img src="../../assets/images/more.png" />
          <p>更多</p>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
import AuthService from 'services/AuthenticationService'
import defaultAvatar from 'assets/images/avatar.png'

export default {
  data() {
    return {
      msg: '用户',
      defaultAvatar: defaultAvatar,
      user: {}
    }
  },
  async activated() {
    const result = (await AuthService.userinfo()).data
    this.user = result || {}
  }
}
</script>
<style scoped>
.things a img:first-child {
  display: none;
}
.things a img:nth-child(2) {
  display: block;
}
.things .router-link-active img:first-child {
  display: block;
}
.things .router-link-active img:nth-child(2) {
  display: none;
}
.router-link-active {
  color: #d60000;
}
.head {
  width: 100%;
  height: 1.88rem;
  background: url('../../assets/images/bg_user.png') no-repeat center/cover;
  position: relative;
}
.head div {
  width: 0.46rem;
  height: 0.46rem;
  margin-left: 44%;
  padding-top: 0.45rem;
}
.head div img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.head p {
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 0.14rem;
}
.head p:nth-child(2) {
  margin-top: 0.1rem;
}
.set {
  position: absolute;
  left: 5.6%;
  top: 0.13rem;
  width: 0.18rem;
  height: 0.19rem;
}
.code_ {
  position: absolute;
  top: 0.13rem;
  left: 87%;
  width: 0.2rem;
  height: 0.21rem;
}
.user .all {
  width: 100%;
  height: 1.8rem;
  background: #fff;
}
.user_all {
  width: 92%;
  height: 1.8rem;
  margin-left: 4%;
  padding-top: 0.05rem;
}
.user_all li {
  width: 25%;
  height: 0.75rem;
  float: left;
  text-align: center;
}
.user_all li img {
  width: 0.39rem;
  height: 0.39rem;
  margin-top: 0.15rem;
}
.user_all li p {
  color: #666;
  height: 0.21rem;
  line-height: 0.21rem;
}
</style>
