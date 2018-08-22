import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'

import Register from '../components/Register.vue'
import Shoppingcart from '../components/Shoppingcart.vue'

import User from '../components/User.vue'
import UserSet from '../components/UserSet.vue'

import GoodsDetail from '../components/GoodsDetail.vue'
import Order from '../components/Order.vue'
import Address from '../components/Address.vue'
import Login from '../components/Login.vue'
import Forgot_Password from '../components/Forgot_Password.vue'
import My_Code from '../components/My_Code.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    // {
    //   path: "/home",
    //   name: "home",
    //   component: resolve => require(["../views/home/Home"], resolve)
    // },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../views/login/Login'], resolve)
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: resolve => require(['../views/forgetPsw/ForgetPsw'], resolve)
    },
    { path: '/home', component: Home },
    {
      path: '/mall',
      component: resolve => require(['../views/mall/index'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../views/mall/All'], resolve)
        },
        {
          path: 'all',
          component: resolve => require(['../views/mall/All'], resolve)
        },
        {
          path: 'skin',
          component: resolve => require(['../views/mall/Skin'], resolve)
        },
        {
          path: 'beauty',
          component: resolve => require(['../views/mall/Beauty'], resolve)
        },
        {
          path: 'perfume',
          component: resolve => require(['../views/mall/Perfume'], resolve)
        }
      ]
    },
    { path: '/register', component: Register },
    { path: '/shoppingcart', component: Shoppingcart },
    { path: '/userset', component: UserSet },
    { path: '/user', component: User },
    { path: '/goodsdetail/:poiId', component: GoodsDetail },
    { path: '/order', component: Order },
    { path: '/address', component: Address },
    { path: '/login', component: Login },
    { path: '/forgotpassword', component: Forgot_Password },
    { path: '/mycode', component: My_Code },
    { path: '*', redirect: '/home' } /*默认跳转的路由*/
  ]
})
