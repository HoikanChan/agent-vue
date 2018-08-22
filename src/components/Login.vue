<template>
    <div class="login">
        <div class="login_head">登录</div>
        <div class="login_msg">
            <ul class="msg">
                <li> 
                    <img src="../assets/images/phone.png" /><input type="number" placeholder="请输入手机号" />
                </li>
                <li>
                    <img src="../assets/images/password1.png" /><input type="text" placeholder="请输入密码" />
                </li>
                <li>
                    <router-link to="/forgotpassword">忘记密码？</router-link>
                </li>
            </ul>
        </div>
        <div class="login-footer">登录</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>
<style>
.login_head{
    width: 100%;
    height: 1.61rem;
    text-align: center;
    font-size: .19rem;
    line-height: 1.73rem;
    color: #5b50d3;
    font-weight: bold;
}
.login_msg .msg{
    width: 61.3%;
    height: 1.59rem;
    margin: 0 auto;
}
.login_msg .msg li{
    width: 100%;
    height: .59rem;
    line-height: .59rem;
    border-bottom: 1px solid #ccc;
}

.login_msg .msg li input{
    font-family: '苹方';
    font-size: .14rem;
}
.login_msg .msg li img{
    padding-left: 1.5%;
    margin-right: 6.3%;
}
.login_msg .msg li:last-child{
    border-bottom: none;
}
.login_msg .msg li:last-child a{
    float: right;
    color: #5b50d3
}
.login-footer{
    width: 61.3%;
    height: .35rem;
    line-height: .35rem;
    color: #fff;
    background: #5b50d3;
    margin: .52rem auto;
    text-align: center;
    border-radius: .2rem;
    font-size: .14rem;
}
</style>

