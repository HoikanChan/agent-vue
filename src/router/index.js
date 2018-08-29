import Vue from 'vue'
import Router from 'vue-router'

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
              meta: { category: 'all', tabName: 'mall' }
            },
            {
              path: 'all',
              component: resolve => require(['../views/mall/All'], resolve),
              meta: { category: 'all', tabName: 'mall' }
            },
            {
              path: 'skin',
              component: resolve => require(['../views/mall/Skin'], resolve),
              meta: { category: 'skin', tabName: 'mall' }
            },
            {
              path: 'beauty',
              component: resolve => require(['../views/mall/Beauty'], resolve),
              meta: { category: 'beauty', tabName: 'mall' }
            },
            {
              path: 'perfume',
              component: resolve => require(['../views/mall/Perfume'], resolve),
              meta: { category: 'perfume', tabName: 'mall' }
            }
          ]
        },
        {
          path: 'home',
          name: 'home',
          component: resolve => require(['../views/home/Home'], resolve),
          meta: { tabName: 'home' }
        },
        {
          path: 'user',
          name: 'user',
          component: resolve => require(['../views/user/User'], resolve),
          meta: { tabName: 'user' }
        },
        {
          path: 'shoppingCart',
          name: 'shoppingCart',
          component: resolve =>
            require(['../views/shoppingCart/ShoppingCart'], resolve),
          meta: { tabName: 'shoppingCart' }
        },
        {
          path: '/examine',
          name: 'examine',
          component: resolve => require(['../views/examine/Examine'], resolve),
          meta: { tabName: 'examine' }
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['../views/register/Register'], resolve)
    },
    {
      path: '/registered',
      name: 'registered',
      component: resolve => require(['../views/register/Registered'], resolve)
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
    {
      path: '/shoppingCartSetting',
      component: resolve =>
        require(['../views/userSetting/UserSetting'], resolve),
      name: 'userSetting'
    },
    {
      path: '/realname',
      component: resolve =>
        require(['../views/userSetting/RealNameRegistration'], resolve),
      name: 'realName'
    },
    {
      path: '/goodsdetail/:poiId',
      name: 'goodsdetail',
      component: resolve => require(['../views/mall/GoodsDetail'], resolve)
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
    {
      path: '/addAddress',
      name: 'addAddress',
      component: resolve => require(['../views/address/addAddress'], resolve)
    },
    {
      path: '/myteam',
      name: 'myteam',
      component: resolve => require(['../views/myteam/MyTeam'], resolve)
    },
    {
      path: '/member_detail',
      name: 'member_detail',
      component: resolve => require(['../views/myteam/Member_Detail'], resolve)
    },
    {
      path: '/teamcash',
      name: 'teamcash',
      component: resolve => require(['../views/teamcash/TeamCash'], resolve)
    },
    {
      path: '/mypoints',
      name: 'mypoints',
      component: resolve => require(['../views/mypoints/MyPoints'], resolve)
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: resolve => require(['../views/myorder/MyOrder'], resolve)
    },
    {
      path: '/order_detail',
      name: 'order_detail',
      component: resolve => require(['../views/myorder/Order_Detail'], resolve)
    },
    {
      path: '/address',
      name: 'address',
      component: resolve => require(['../views/address/address'], resolve)
    },
    {
      path: '/upgrade',
      name: 'upgrade',
      component: resolve => require(['../views/check/Check'], resolve)
    },
    // { path: '/login', component: Login },
    // { path: '/forgotpassword', component: Forgot_Password },
    {
      path: '/messages',
      name: 'messages',
      component: resolve =>
        require(['../views/systemMessages/SystemMessages'], resolve)
    },
    {
      path: '/mydeposit',
      name: 'mydeposit',
      component: resolve => require(['../views/mydeposit/MyDeposit'], resolve)
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: resolve => require(['../views/authorization/Authorization'], resolve)
    },
    {
      path: '/mycode',
      name: 'mycode',
      component: resolve => require(['../views/myCode/MyCode'], resolve)
    },
    { path: '*', redirect: '/home' } /*默认跳转的路由*/
  ]
})
