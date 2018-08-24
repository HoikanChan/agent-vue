<template>
  <div class="user">
    <div class="head">
      <div><img src="../assets/images/13.jpg" /></div>
      <p>不问明天</p>
      <p>总代</p>
      <router-link to="/userset"><img class="set" src="../assets/images/set.png" /></router-link>
      <img class="code" src="../assets/images/message.png" />
    </div>
    <div class="all">
      <ul class="user_all">
        <li>
          <img src="../assets/images/orderlist.png" />
          <p>我的订单</p>
        </li>
        <li @click="$router.push({name:'myteam'})">
          <img src="../assets/images/team_user.png" />
          <p>我的团队</p>
        </li>
        <li>
          <img src="../assets/images/team_point.png" />
          <p>团队业绩</p>
        </li>
        <li>
          <img src="../assets/images/point_user.png" />
          <p>我的积分</p>
        </li>
        <li>
          <img src="../assets/images/book.png" />
          <p>授权书</p>
        </li>
        <li>
          <img src="../assets/images/code_user.png" />
          <p>推广码</p>
        </li>
        <li>
          <img src="../assets/images/shopcart.png" />
          <p>购物车</p>
        </li>
        <li>
          <img src="../assets/images/upgrade.png" />
          <p>升级</p>
        </li>
        <li>
          <img src="../assets/images/cash_user.png" />
          <p>购物车</p>
        </li>
        <li>
          <img src="../assets/images/more.png" />
          <p>升级</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '用户'
    }
  }
}
</script>
<style>
@import url('../assets/css/user.css');
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
