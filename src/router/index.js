import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/login",
      name: "login",
      component: resolve => require(["../views/login/Login"], resolve)
    },
    {
      path: "*",
      name: "page404",
      component: resolve => require(["../views/page404.vue"], resolve)
    }
  ]
});
