<template>
    <div class="member">
        <div class="team_head">
            <img class="back" src="../../assets/images/back.png" />
            余生不送
            <img class="cash" src="../../assets/images/team_cash.png" />
        </div>
        <div class="detail">
            <div class="one">
                <img src="../../assets/images/4.jpg" />
                <p>余生不送</p>
            </div>
            <div class="two">
                <p class="phone">手机号码:<span>15797964844</span></p>
                <p>代理等级:<span>总代</span></p>
                <p>注册时间:<span>2017-10-12</span></p>
                <p>本月业绩:<span>222222.00</span></p>
                <p>累计业绩:<span>8888888.00</span></p>
            </div>
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

<style lang="less">
.member{
     .team_head{
            width: 100%;
            height: .44rem;
            text-align: center;
            padding: 0 4.8%;
            line-height: .44rem;
            font-size: .16rem;
            color: #000;
            .back{
                float: left;
                width: .1rem;
                height: .16rem;
                margin-top: .15rem;
            }
            .cash{
                float: right;
                width: .2rem;
                height: .2rem;
                margin-top: .12rem;
                margin-right: .01rem;
            }
        }
        .detail{
            width: 100%;
            height: 1.53rem;
            background: #5b50d3;
            .one{
                width: 40%;
                height: 1.53rem;
                float:left;
                img{
                    width: .62rem;
                    height: .62rem;
                    border-radius: 50%;
                    border:1px solid #fff;
                    margin-left:30%;
                    margin-top:.35rem;
                }
                p{
                    text-align:center;
                    color:#fff;
                    font-size:.15rem;
                }
            }
            .two{
                width:60%;
                height:1.53rem;
                float:left;
                .phone{
                    margin-top:.28rem;
                }
                p{
                    color:#fff;
                    margin-left:15.1%;
                    margin-top:.01rem;
                    font-size:.12rem;
                }
            }
        }
}
</style>

