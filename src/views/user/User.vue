<template>
  <div class="user">
    <div class="head">
      <div><img :src="user.avatar || defaultAvatar" alt=""></div>
      <p>{{user.username}}</p>
      <p>{{user.userLevelName}}</p>
      <router-link to="/userSetting"><img class="set" src="../../assets/images/set.png" /></router-link>
      <router-link to="/messages"><img style="width:.2rem;height:.21rem;" class="code_" src="../../assets/images/message.png" /></router-link>
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
        <li>
          <img src="../../assets/images/book.png" />
          <p>授权书</p>
        </li>
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
        <li>
          <img src="../../assets/images/cash_user.png" />
          <p>押金</p>
        </li>
        <li>
          <img src="../../assets/images/more.png" />
          <p>更多</p>
        </li>
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
  async mounted() {
    const result = (await AuthService.userinfo()).data
    this.user = result || {}
  }
}
</script>
<style>
@import url('../../assets/css/user.css');
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
</style>
