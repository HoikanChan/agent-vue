<template>
    <div class="userset">
        <div class="userset_top">
            <img src="../assets/images/goback.png" />
            <p>个人设置</p>
            <span>保存</span>
        </div>
        <ul class="head_list">
            <li><p>头像</p></li>
            <li><p>昵称</p><input type="text" value="小猪猪"/></li>
            <li><p>性别</p></li>
            <li><p>生日</p><i><img src="../assets/images/right.png" /></i><yd-datetime type="date" v-model="datetime0"></yd-datetime></li>
        </ul>
        <ul class="head_list second">
            <li><p>密码</p><input type="text" value="输入密码"/></li>
            <li><p>确认密码</p><input type="text" value="再次输入"/></li>
            <li><p>手机号码</p><input type="text" value="请输入手机号"/></li>
            <li><p>注册时间</p><span>2018-02-12</span></li>
            <li><p>所在地</p></li>
        </ul>
        <div class="last">实名认证</div>
    </div>
</template>
<script>
import '../../node_modules/vue-ydui/dist/ydui.rem.css'
export default {
  data() {
    return {
      msg: '个人设置',
      datetime0: ''
    }
  },
  methods: {
    open() {
      this.$refs.datetime.open()
    }
  }
}
</script>
<style>
@import url('../assets/css/userset.css');
.yd-datetime-input {
  width: 45%;
  display: inline-block;
  float: right;
  text-align: right;
}
.yd-datetime-head {
  height: 43px;
  background: #eee;
}
.yd-datetime-head a {
  display: block;
  width: 46px;
  height: 43px;
  height: 0.28rem;
  line-height: 0.28rem;
  text-align: center;
  padding: 0;
  text-align: center;
  border-radius: 0.03rem;
  margin-top: 0.07rem;
  font-size: 0.12rem;
}
.yd-datetime-head a:first-child {
  background: #fff;
  border: 1px solid #bbb;
  margin-left: 3.4%;
  color: #000;
}
.yd-datetime-head a:nth-child(2) {
  background: #5b50d3;
  float: right;
  margin-right: 3.4%;
  color: #fff;
}
</style>
