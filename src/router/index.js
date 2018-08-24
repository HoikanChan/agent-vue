import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'

import Register from '../components/Register.vue'

import User from '../components/User.vue'
import UserSet from '../components/UserSet.vue'

import Order from '../components/Order.vue'
import Login from '../components/Login.vue'
import Forgot_Password from '../components/Forgot_Password.vue'
import My_Code from '../components/My_Code.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['../views/layout'], resolve),
      redirect: { name: 'home' },
      children: [
        {
          path: 'mall',
          component: resolve => require(['../views/mall/index'], resolve),
          children: [
            {
              path: '/',
              component: resolve => require(['../views/mall/All'], resolve),
              meta: { category: 'all' }
            },
            {
              path: 'all',
              component: resolve => require(['../views/mall/All'], resolve),
              meta: { category: 'all' }
            },
            {
              path: 'skin',
              component: resolve => require(['../views/mall/Skin'], resolve),
              meta: { category: 'skin' }
            },
            {
              path: 'beauty',
              component: resolve => require(['../views/mall/Beauty'], resolve),
              meta: { category: 'beauty' }
            },
            {
              path: 'perfume',
              component: resolve => require(['../views/mall/Perfume'], resolve),
              meta: { category: 'perfume' }
            }
          ]
        },
        {
          path: 'home',
          name: 'home',
          component: resolve => require(['../views/home/Home'], resolve)
        },
        { path: 'user', name: 'user', component: User },
        {
          path: 'shoppingCart',
          name: 'shoppingCart',
          component: resolve =>
            require(['../views/shoppingCart/ShoppingCart'], resolve)
        },
        { path: 'register', name: 'register', component: Register }
      ]
    },
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
    { path: '/userset', component: UserSet },
    {
      path: '/goodsdetail/:poiId',
      name: 'goodsdetail',
      component: resolve => require(['../views/mall/GoodsDetail'], resolve)
    },
    {
      path: '/myteam',
      name: 'myteam',
      component: resolve => require(['../views/myteam/MyTeam'], resolve)
    },
    {
      path: '/buy',
      name: 'buy',
      component: resolve => require(['../views/buy/Buy'], resolve)
    },
    {
      path: '/bought',
      name: 'bought',
      component: resolve => require(['../views/buy/Bought'], resolve)
    },
    { path: '/order', component: Order },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: resolve => require(['../views/address/addAddress'], resolve)
    },
    {
      path: '/address',
      name: 'address',
      component: resolve => require(['../views/address/address'], resolve)
    },
    { path: '/login', component: Login },
    { path: '/forgotpassword', component: Forgot_Password },
    { path: '/mycode', component: My_Code },
    { path: '*', redirect: '/user' } /*默认跳转的路由*/
  ]
})
