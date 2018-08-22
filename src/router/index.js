import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'

import Category from '../components/Category.vue'
import All from '../components/category/All.vue'
import Skin from '../components/category/Skin.vue'
import Beauty from '../components/category/Beauty.vue'
import Perfume from '../components/category/Perfume.vue'

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
      path: '/category',
      component: Category,
      children: [
        {
          path: '/',
          component: All
        },
        {
          path: 'all',
          component: All
        },
        {
          path: 'skin',
          component: Skin
        },
        {
          path: 'beauty',
          component: Beauty
        },
        {
          path: 'perfume',
          component: Perfume
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
