<template>
    <div class="mypoints">
        <div class="mypoints_head">
            <img class="back" src="../../assets/images/back.png" />
            我的积分
        </div>
        <div class="point_body">
            <p>22222222<span>元</span></p>
            <div class="detail">
                <div class="record">积分明细</div>
                <div class="deeded" @click="point">积分转让</div>
            </div>
        </div>
        <div class="date">
            <div class="time">
                <h3>本月</h3>
                <p>支出<span>220.00</span></p><p>收入<span>220.00</span></p>
            </div>
            <div class="rili">
                <img src="../../assets/images/date.png" @click="date"/>
            </div>
        </div>
        <div class="all_recode">
            <p>全部分类<img src="../../assets/images/style.png" /></p>
            <div class="months">
                <h4>2018-08</h4>
                <p>支出<span>220.00</span></p><p>收入<span>220.00</span></p>
            </div>
            <ul>
                <li>
                    <p class="type">其他类型<span>-224.00</span></p>
                    <p class="clock">2018-8-15<i>17:18:12</i></p><span>剩余:<i>1100</i></span>
                    <p class="pay">冲账</p>
                </li>
                <li>
                    <p class="type">其他类型<span>-224.00</span></p>
                    <p class="clock">2018-8-15<i>17:18:12</i></p><span>剩余:<i>1100</i></span>
                    <p class="pay">冲账</p>
                </li>
            </ul>
        </div>
        <div class="shade" v-if="flag"></div>
        <div class="modal" v-if="flag">
            <h2>积分转让 <img src="../../assets/images/flase.png" @click="hide()" /></h2>
            <div class="proptype">
                <group>
                    <x-input title="" v-model="phone" :required="true" placeholder="请输入对方手机号码" is-type="china-mobile"></x-input>
                </group>
                <group>
                    <x-input title="" v-model="username" :required="true" placeholder="请输入对方昵称" type="text"></x-input>
                </group>
                <group>
                    <x-input title="" v-model="text" :required="true" placeholder="请输入备注" type="text"></x-input>
                </group>
                <group>
                    <x-input title="" v-model="points" :required="true" placeholder="请输入大于1的积分" type="number"></x-input>
                </group>
            </div>
            <x-button type="primary" action-type="submit" class="round-btn submit" @click.native="submit()">确定</x-button>
            <p>转让成功系统将自动发送消息</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { XInput,Group,XButton,Alert,Datetime,Popup   } from 'vux';
export default {
    data(){
        return{
            phone:'',
            username:'',
            text:'',
            points:'',
            flag:false
        }
    },
    components: {
        XInput,
        Group,
        XButton,
        Alert,
        Datetime,
        Popup 
    },
    methods:{
        submit(){
            if(this.phone==''|| this.username=='' ||this.text==''||this.points==''){
                this.$vux.alert.show({
                    title:'输入不能为空',
                    content: '请重新输入',
                    onShow () {
                        console.log('Plugin: I\'m showing')
                    },
                    onHide () {
                        console.log('Plugin: I\'m hiding')
                    }
                })
            }else{
               var message={
                   phone:this.phone,
                   username:this.username,
                   text:this.text,
                   points:this.points
               }
               axios.post('/user', message)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        point:function(){
            this.flag=true
        },
        hide:function(){
            this.flag=false
        },
        date:()=>{
            this.$vux.datetime.show({
                value: '', // 其他参数同 props
                onHide () {
                    const _this = this
                },
                onShow () {
                    const _this = this
                }
            })
            this.$vux.datetime.hide()
        }
    }
}
</script>
<style lang="less">
.mypoints{
    .mypoints_head{
        width:100%;
        height:.44rem;
        line-height: .44rem;
        padding:0 4.8%;
        text-align: center;
        font-size: .18rem;
        .back{
            float: left;
            width: .1rem;
            height: .16rem;
            margin-top: .15rem;
        }
    }
    .point_body{
        width: 100%;
        height: 1.44rem;
        background: url('../../assets/images/point_bg.png') no-repeat center/cover;
        text-align: center;
        color: #fff;
        p{
            font-size: .26rem;
            padding-top: .42rem;
        }
        .detail{
            width: 45.6%;
            height: .26rem;
            margin-left: 27.2%;
            margin-top: .16rem;
            .record{
                width: 50%;
                height: .26rem;
                border-radius: .13rem 0 0 .13rem;
                background: #5b50d3;
                float: left;
                line-height: .26rem;
                text-align: center;
            }
            .deeded{
                width: 50%;
                height: .26rem;
                line-height: .26rem;
                text-align: center;
                border-radius:0 .13rem .13rem 0;
                background: #fff;
                float: left;
                color: #000
            }
        }
    }
    .date{
        width: 100%;
        height: .64rem;
        background: #5b50d3;
        margin-top: .1rem;
        padding: 0 4.8%;
        color: #fff;
        .time{
            width: 70%;
            height: .64rem;
            float: left;
            h3{
                margin-top: .13rem;
                font-weight: normal;
                font-size: .14rem;
            }
            p{
                display: inline-block;
                margin-top: .02rem;
                width: 40%;
                span{
                    padding-left:10%;
                }
            }
        }
        .rili{
            width: 30%;
            height: .64rem;
            float: left;
            img{
                width: .24rem;
                height: .23rem;
                float: right;
                margin-top: .2rem; 
            }
        }
    }
    .all_recode{
        background: #fff;
        p{
            height: .35rem;
            line-height: .35rem;
            padding-left: 4.8%;
            font-size: .16rem;
            font-weight: bold;
            img{
                width: .15rem;
                height: .08rem;
            }
        }
        .months{
            width: 100%;
            height: .6rem;
            border-bottom: 1px solid #ccc;
            h4{
                padding-left: 4.8%;
                font-size: .16rem;
                padding-top: .1rem;
            }
            p{
                display: inline-block;
                height: .23rem;
                line-height: .23rem;
                font-size: .14rem;
                color: #666;
            }
        }
        ul{
            li{
                width: 100%;
                height: .95rem;
                padding: 0 4.8%;
                border-bottom: 1px solid #ccc;
                .type{
                    padding-left: 0;
                    span{
                        float: right;
                        font-size: .14rem;
                        color: #5b50d3;
                    }
                }
                .clock{
                    padding-left: 0;
                    font-weight: normal;
                    height: .3rem;
                    line-height: .3rem;
                    display: inline-block;
                    width: 60%;
                    i{
                        padding-left: 2%;
                    }
                }
                span{
                    font-size: .14rem;
                    color: #5b50d3;
                    float: right;
                    margin-top: .08rem;
                }
                .pay{
                    font-size: .14rem;
                    color: #666;
                    padding-left: 0;
                    font-weight: normal;
                    height: .18rem;
                    line-height: .18rem;
                }
               
            }
        }
    }
    .shade{
        position: fixed;
        top:0;
        left:0;
        z-index:100;
        width:100%;
        height:100%;
        background-color:#000;
        opacity:0.3;
        /*兼容IE8及以下版本浏览器*/
        filter: alpha(opacity=30);
        display:block;
    }
    .modal{
        position: absolute;
        z-index:101;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width:72%;
        height:3.33rem;
        margin: auto;
        display:block;
        border-radius: .05rem;
        background: #fff;
        h2{
            text-align: center;
            font-size: .18rem;
            margin-top: .27rem;
            position: relative;
            img{
                width: .35rem;
                height: .35rem;
                position: absolute;
                left: 82%;
                top: -.2rem;
            }
        }
        .proptype{
            width: 75%;
            margin:.15rem auto;
        }
        .submit{
            width: 86%;
            height: .35rem;
            background: #5b50d3;
            color: #fff;
            line-height: .35rem;
            text-align: center;
            border-radius: .2rem;
            margin-top: .15rem;
            font-size: .14rem;
        }
        p{
            text-align: center;
            height: .27rem;
            line-height: .27rem;
            margin-top: .1rem;
            color: #999;
        }
    }
}
.weui-cells:before{
    border: none !important;
}
.weui-cells:before{
    border: none !important;
}
.weui-cells{
    font-size: .14rem !important;
}
.vux-no-group-title{
    height: .42rem !important;
    line-height: .42rem !important;
    margin-top: 0 !important;
}
.weui-cell{
    padding: 0 15px !important;
}
</style>


