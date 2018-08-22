<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="less">
@import url("../src/assets/css/public.css");

body {
  margin: 0;
}
button.round-btn {
  border-radius: 50px;
}
</style>

