<template>
    <div class="forget">
        <div class="head">
            <img src="../assets/images/back.png" />
            忘记密码
        </div>
        <div class="update">
            <ul>
                <li><img style="width:0.14rem;height:.16rem;" src="../assets/images/phone.png" /><input type="number" placeholder="请输入手机号" /></li>
                <li><img style="width:0.13rem;height:.13rem;" src="../assets/images/code_number.png" /><input type="number" placeholder="请输入验证码" /><div class="code">获取验证码</div></li>
                <li><img style="width:0.14rem;height:.16rem;" src="../assets/images/password.png" /><input type="text" placeholder="设置新密码" /></li>
                <li><img style="width:0.14rem;height:.16rem;" src="../assets/images/password.png" /><input type="text" placeholder="确认密码" /></li>
            </ul>
        </div>
        <div class="submit">提交修改</div>
    </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style>
.forget .head {
  width: 100%;
  height: 0.45rem;
  text-align: center;
  line-height: 0.45rem;
  position: relative;
  font-size: 0.18rem;
}
.forget .head img {
  position: absolute;
  top: 0.14rem;
  left: 4%;
  width: 0.09rem;
  height: 0.15rem;
}
.update {
  height: 2.62rem;
  width: 61.6%;
  margin: 0.63rem auto;
}
.update ul li {
  width: 100%;
  height: 0.52rem;
  line-height: 0.52rem;
  border-bottom: 1px solid #ccc;
}
.update ul li:nth-child(2) input {
  width: 53.5%;
}
.code {
  display: inline-block;
  width: 34.6%;
  height: 0.28rem;
  line-height: 0.28rem;
  color: #fff;
  text-align: center;
  background: #5b50d3;
  border-radius: 0.03rem;
}
.update ul li img {
  margin-left: 1.5%;
}
.update ul li input {
  font-family: '苹方';
  padding-left: 4%;
  font-size: 0.14rem;
}
.submit {
  width: 61.6%;
  height: 0.35rem;
  line-height: 0.35rem;
  text-align: center;
  background: #5b50d3;
  color: #fff;
  margin: 0 auto;
  border-radius: 0.2rem;
  font-size: 0.14rem;
}
</style>
