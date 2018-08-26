<template>
    <div class="myorder">
        <div class="myorder_head">
            <img class="back" src="../../assets/images/back.png" />
            我的订单
        </div>
        <div class="things">
            <a class="active">全部</a>
            <a class="two">待发货</a>
            <a class="three">待收货</a>
        </div>
        <div class="shoppings">
            <div class="first">
                <div class="shophead">
                    <img src="../../assets/images/9.jpg" />
                    <span>代理商的昵称</span>
                    <i>已发货</i>
                </div>
                <ul>
                    <li>
                        <div class="left"><img src="../../assets/images/22.jpg" /></div>
                        <div class="right">
                            <p class="name">好吃的可爱多
                                <span>(10支/一盒)</span>
                            </p>
                            <p class="msg">产品信息
                                <span>10支/一盒</span>
                            </p>
                            <p class="msg_">乳液体</p>
                            <p class="price">￥990.00</p>
                            <span class="number">×12</span>
                        </div>
                    </li>
                </ul>
                <div class="add">共<span>1</span>件商品    合计：￥<i>990.00</i>元(不含运费)</div>
                <div class="logistics">
                    <router-link to="#" class="blue">确认收货</router-link>
                    <router-link to="#">查看物流</router-link>
                </div>
            </div>
             <div class="first">
                <div class="shophead">
                    <img src="../../assets/images/9.jpg" />
                    <span>代理商的昵称</span>
                    <i>待发货</i>
                </div>
                <ul>
                    <li>
                        <div class="left"><img src="../../assets/images/22.jpg" /></div>
                        <div class="right">
                            <p class="name">好吃的可爱多
                                <span>(10支/一盒)</span>
                            </p>
                            <p class="msg">产品信息
                                <span>10支/一盒</span>
                            </p>
                            <p class="msg_">乳液体</p>
                            <p class="price">￥990.00</p>
                            <span class="number">×12</span>
                        </div>
                    </li>
                </ul>
                <div class="add">共<span>1</span>件商品    合计：￥<i>990.00</i>元(不含运费)</div>
                <div class="logistics">
                    <router-link to="#" class="blue">确认收货</router-link>
                    <router-link to="#">查看物流</router-link>
                </div>
            </div>
             <div class="first">
                <div class="shophead">
                    <img src="../../assets/images/9.jpg" />
                    <span>代理商的昵称</span>
                    <i>待收货</i>
                </div>
                <ul>
                    <li>
                        <div class="left"><img src="../../assets/images/22.jpg" /></div>
                        <div class="right">
                            <p class="name">好吃的可爱多
                                <span>(10支/一盒)</span>
                            </p>
                            <p class="msg">产品信息
                                <span>10支/一盒</span>
                            </p>
                            <p class="msg_">乳液体</p>
                            <p class="price">￥990.00</p>
                            <span class="number">×12</span>
                        </div>
                    </li>
                </ul>
                <div class="add">共<span>1</span>件商品    合计：￥<i>990.00</i>元(不含运费)</div>
                <div class="logistics">
                    <router-link to="#" class="blue">确认收货</router-link>
                    <router-link to="#">查看物流</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted() {
        $('.things a').click(function() {
         $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')
        $(".shoppings .first").eq($(this).index()).show().siblings().hide();
        })
       
    },
}
</script>
<style lang="less">
.myorder{
    .myorder_head{
        width: 100%;
        height: .44rem;
        line-height: .44rem;
        padding: 0 4.8%;
        text-align: center;
        font-size: .18rem;
        border-bottom: 1px solid #ccc;
        .back{
            float: left;
            width: .1rem;
            height: .16rem;
            margin-top: .15rem;
           
        }
    }
    .things{
        width: 100%;
        height: .41rem;
        padding: 0 4.8%;
        background: #fff;
        border-bottom: 1px solid #ccc;
        a{
            display: block;
            width: 17.2%;
            height: .41rem;
            line-height: .41rem;
            text-align: center;
            float: left;
            font-size: .14rem;
        }
        .two{
            margin-left: 22%;
        }
        .three{
            margin-left: 22%;
        }
    }
    .shoppings{
        margin-top: .1rem;
        .first{
            .shophead{
                width: 100%;
                height: .4rem;
                line-height: .4rem;
                background: #fff;
                padding: 0 4.8%;
                img{
                    width: .23rem;
                    height: .23rem;
                    border-radius: 50%;
                }
                span{
                    padding-left: 1.2%;
                    font-size: .15rem;
                }
                i{
                    float: right;
                    font-size: .13rem;
                    color: #5b50d3;
                }
            }
            ul{
                li{
                    width: 100%;
                    height: 1.41rem;
                    padding: 0 4.8%;
                    .left{
                        width: 1.1rem;
                        height: 1.1rem;
                        margin-top: .15rem;
                        float: left;
                        img{
                            width: 1.1rem;
                            height: 1.1rem;
                        }
                    }
                    .right{
                        float: right;
                        width: 60%;
                        height: 1.41rem;
                        .name{
                            font-size: .14rem;
                            margin-top: .12rem;
                            font-weight: bold;
                        }
                        .msg{
                            font-size: .13rem;
                            color: #666;
                            margin-top: .06rem;
                        }
                        .msg_{
                            font-size: .13rem;
                            color: #666;
                        }
                        .price{
                            font-size: .2rem;
                            color: #5b50d3;
                            font-weight: bold;
                            margin-top: .28rem;
                            display: inline-block;
                        }
                        .number{
                            float: right;
                            margin-top: .28rem;
                            font-size: .2rem;
                        }
                    }
                }
            }
            .add{
                width: 100%;
                height: .43rem;
                line-height: .43rem;
                border-bottom: 1px solid #ccc;
                background: #fff;
                font-size: .13rem;
                text-align: right;
                padding-right: 4.8%;
                i{
                    font-size: .15rem;
                }
            }
            .logistics{
                width: 100%;
                height: .53rem;
                background: #fff;
                a{
                    display: block;
                    width: 16.5%;
                    height: .22rem;
                    line-height: .22rem;
                    text-align: center;
                    border: 1px solid #999;
                    float:right;
                    border-radius:.03rem;
                    margin-right:4.8%;
                    margin-top:.15rem;
                    font-size:.13rem;
                    color:#000;
                }
                .blue{
                    color: #5b50d3;
                    border: 1px solid #5b50d3;
                }
            }
        }
    }
}



.active{
    border-bottom: .04rem solid #5b50d3;
    color: #5b50d3;
}
.first:nth-child(2),.first:nth-child(3){
    display:none;
}
</style>


