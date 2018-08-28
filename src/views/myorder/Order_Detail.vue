<template>
    <div class="order_detail">
        <div class="detail_head">
            <img class="back" src="../../assets/images/back.png" />
            订单详情
        </div>
        <div class="ordernumber">
            <p>等待卖家发货</p>
            <p class="number">订单编号:<span>20131219246437</span></p>
        </div>
        <div class="address">
            <div class="top">
                <p>收货人：<span>陈琴</span></p>
                <p class="right">联系电话：<span>15797964844</span></p>
            </div>
            <div class="loation">
                <img src="../../assets/images/location.png" />
                <div class="locate">
                    <span>收货地址:<i>广东省广州市花都区新华街道花都区迎兵大道和合新城</i></span>
                </div>
            </div>
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
        <div class="order_price">
            <p>商品总价<span>1800</span></p>
        </div>
        <div class="order_time">
            <p>下单时间<span>2018-8-8&nbsp;&nbsp;&nbsp;<i>17:33</i></span></p>
        </div>
        <div class="buyer">
            <h3>买家留言</h3>
            <p>请尽快发货......</p>
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
.order_detail{
    .detail_head{
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
    .ordernumber{
        height: .84rem;
        background: url('../../assets/images/order_bg.png') no-repeat center/cover;
        p{
            font-size: .13rem;
            color: #fff;
            padding-left: 12%;
            padding-top: .2rem;
        }
        .number{
            padding-top: 0;
        }
    }
    .address{
        height: 1.04rem;
        padding: 0 4.8%;
        background: #fff;
        .top{
            width: 100%;
            height: .42rem;
            p{
            display: inline-block;
            margin-left: 7.2%;
            font-size: .13rem;
            height: .22rem;
            line-height: .22rem;
            margin-top: .2rem;
            font-weight: bold;
            float: left;
            }
            .right{
                float: right;
            }
        }
        .loation{
            width: 100%;
            height: .5rem;
            margin-top: .12rem;
            img{
                display: inline-block;
                width: .17rem;
                height: .22rem;
                float: left;
            }
            .locate{
                width: 93%;
                height: .5rem;
                float: right;
                font-size: .13rem;
                padding-left: 2%;
                span{
                    height: .15rem;
                    line-height: .15rem;
                }
            }
        }
       
    }
    ul{
        li{
            height: 1.41rem;
            padding: 0 4.8%;
            border-bottom: 1px solid #ccc;
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
    .order_price{
        height: .42rem;
        border-bottom: 1px solid #ccc;
        padding: 0 4.8%;
        background: #fff;
        p{
            height: .42rem;
            line-height: .42rem;
            font-size: .13rem;
            color: #666;
            font-weight: bold;
            span{
                float: right;
                font-weight: bold;
                font-size: .14rem;
                color: #5b50d3;
            }
        }
    }
    .order_time{
        height: .42rem;
        border-bottom: 1px solid #ccc;
        padding: 0 4.8%;
        background: #fff;
        p{
            height: .42rem;
            line-height: .42rem;
            font-size: .13rem;
            color: #666;
            font-weight: bold;
            span{
                float: right;
                font-weight: bold;
                font-size: .14rem;
                color: #666;
                i{
                    font-weight: bold;
                }
            }
        }
    }
    .buyer{
        height: .68rem;
        background: #fff;
        padding: 0 4.8%;
        h3{
            display: inline-block;
            height: .17rem;
            line-height: .17rem;
            padding-top: .13rem;
        }
        p{
            display: inline-block;
            padding-left: 1%;
        }
    }
}
ul li:last-child{
    border-bottom: none;
}
</style>

