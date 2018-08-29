<template>
  <div class="footer">
    <router-link to="/home">
      <img src='../assets/images/home.png' v-if="tabName === 'home'" />
      <img src='../assets/images/home_.png' v-if="tabName !== 'home'" />
      <span>首页</span>
    </router-link>
    <router-link to="/mall">
      <img src='../assets/images/category.png' v-if="tabName === 'mall'" />
      <img src='../assets/images/category_.png' v-else/>
      <span>分类</span>
    </router-link>
    <router-link to="/examine">
      <img src='../assets/images/register.png' v-if="tabName === 'examine'" />
      <img src='../assets/images/register_.png' v-else/>
      <span>审批</span>
    </router-link>
    <router-link to="/shoppingcart">
      <img src='../assets/images/shoppingcart.png' v-if="tabName === 'shoppingCart'" />
      <img src='../assets/images/shoppingcart_.png' v-else/>
      <span>购物车</span>
    </router-link>
    <router-link to="/user">
      <img src='../assets/images/user.png' v-if="tabName === 'user'" />
      <img src='../assets/images/user_.png' v-else/>
      <span>我的</span>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    tabName: function() {
      return this.$route.meta.tabName
    }
  }
}
</script>
<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.47rem;
  display: flex;
  border-top: 1px solid #ccc;
  justify-content: space-around;
  padding-top: 4px;
  background: #fff;
}
/* img{
    width: .24rem;
    height: .22rem;
} */
.footer a:first-child img {
  width: 0.24rem;
  height: 0.22rem;
}
.footer a:nth-child(2) img {
  width: 0.21rem;
  height: 0.22rem;
}
.footer a:nth-child(3) img {
  width: 0.18rem;
  height: 0.21rem;
}
.footer a:nth-child(4) img {
  width: 0.23rem;
  height: 0.22rem;
}
.footer a:nth-child(5) img {
  width: 0.21rem;
  height: 0.23rem;
}
.footer a {
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
}

.footer a img:nth-child(2) {
  display: block;
}
.footer .router-link-active img:first-child {
  display: block;
}
.router-link-active {
  color: #5b50d3;
}
p {
  font-size: 0.14rem;
}
</style>
