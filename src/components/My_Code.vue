<template>
    <div class="code_user">
        <div class="code_top">
            我的二维码
            <img src="../assets/images/back.png" />
        </div>
        <div>
            <!-- <img src="../assets/images/msg_code.png" /> -->
            <div class="head_msg">
                <div><img src="../assets/images/20.jpg" /></div>
                <div>
                    <p>大傻子</p>
                    <p>广州市</p>
                </div>
            </div>
            <img class="msg_code" src="../assets/images/msg_code.png" />
            <p>扫一扫上面的二维码，可加盟代理</p>
        </div>
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
.code_user .code_top{
    width: 100%;
    height: .45rem;
    background: #fff;
    line-height: .45rem;
    text-align: center;
    font-size: .18rem;
    position: relative;
}
.code_user .code_top img{
    position: absolute;
    top: .14rem;
    left: 4.8%;
    width: .09rem;
    height: .16rem;
}
/* body{
    background: url('../assets/images/code_bg.png') no-repeat center/cover;
} */
.code_user div:nth-child(2){
    width: 87.2%;
    height: 4.37rem;
    background: #FFF;
    margin: .75rem auto;
    border-radius: .04rem;
}
.code_user div:nth-child(2) .head_msg{
    width: 100%;
    height: .67rem;
}
.code_user div:nth-child(2) .head_msg div{
    float: left;
}
.code_user div:nth-child(2) .head_msg div:first-child{
    width: .67rem;
    height: .67rem;
    margin-left: 9%;
    margin-top: .3rem;
}
.code_user div:nth-child(2) .head_msg div:first-child img{
    width: .67rem;
    height: auto;
    border-radius: .04rem;
}
.code_user div:nth-child(2) .head_msg div:nth-child(2){
    width: 54%;
    height: .67rem;
    margin: 0;
    margin-top: .3rem;
    margin-left: 3%;
}
.code_user div:nth-child(2) .head_msg div:nth-child(2) p:nth-child(1){
    margin-top: .06rem;
    font-size: .17rem;
    font-weight: bold;
    text-align: left;
}
.code_user div:nth-child(2) .head_msg div:nth-child(2) p:nth-child(2){
    margin-top: .08rem;
    font-size: .15rem;
    color: #999;
    text-align: left;
}
.msg_code{
    width: 2.4rem;
    height: 2.4rem;
    margin-left: 13.4%;
    margin-top: .2rem;
}
.code_user div:nth-child(2) p{
    text-align: center;
    margin-top: .32rem;
    color: #666;
}
</style>


