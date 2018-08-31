<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
@import url('../src/assets/css/public.css');

body {
  margin: 0;
  font-size: 0.12rem;
  font-family: '苹方' !important;
}
#app {
  height: 100vh;
  background: #f6f6f6;
}
button.round-btn {
  border-radius: 50px;
}
input,
textarea {
  font-family: '苹方' !important;
}
button {
  font-family: '苹方' !important;
}
//覆盖VUX group组件无title时的margin-top
.vux-no-group-title {
  margin-top: 0 !important;
}
.weui-cells {
  font-size: 0.13rem !important;
  &:before {
    border: none;
  }
  &:after {
    border: none;
  }
}
</style>
