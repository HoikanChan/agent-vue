<template>
    <div class="check">
        <div class="check_head">
            <img class="back" src="../../assets/images/back.png" />
            升级
        </div>
        <div class="upgrade">
            <div class="rank">
                <img class="face" src="../../assets/images/22.jpg" />
                <img class="grade" src="../../assets/images/rank.png" />
                <p>大区</p>
            </div>
            <div class="up">
                <img class="up_img" src="../../assets/images/up.png" />
                <span @click="upgrade">升级</span>
            </div>
        </div>
        <checker v-model="picked" default-item-class="demo2-item" selected-item-class="selected" radio-required>
            <checker-item v-for="(item,index) in scale" :key="index" :value="item.id">
                <div class="option_referer">
                    <div class="option">
                        <div class="checkbox-wrapper">
                            <material-checkbox ></material-checkbox>
                        </div>
                        <span>{{item.rank}}</span>
                        
                        <img src="../../assets/images/right.png" />
                        <i>{{item.money}}</i>
                    </div>
                    <div class="referer" v-for="man in item.member" >
                       <div>
                           <p>审核人:<span>{{man.pass}}</span></p>
                           <p>手机号码:<span>15797964844</span></p>
                           <p>注册等级:<span>总代</span></p>
                           <p>推荐人:<span>陈洋</span></p>
                       </div>
                       <div>
                           <img src="../../assets/images/22.jpg" />
                       </div>
                    </div>
                </div>
            </checker-item>
        </checker>
        <div class="shade" v-show="flag"></div>
        <div class="modal" v-show="flag">
            <p>等待审核</p>
            <p>审核结果将以系统消息通知</p>
            <div @click="close">我知道了</div>
        </div>
    </div>
</template>

<script>
import { XHeader, Checker, CheckerItem,Checklist } from 'vux'
import Checkbox from 'components/Checkbox'
export default {
    data(){
        return{
            flag:false,
            checked: true,
            picked: '',
            scale: [
                {
                id: 1,
                rank: '官方合伙人24万 + 押金1万',
                money: '25万',
                member:[
                    {
                        pass:'茉莉',
                        personal:'15797964844',
                        service:'12545635895'
                    }
                ]
                },
                {
                id: 2,
                rank: '总代6.2万 + 押金5千',
                money: '6.2万5千',
                member:[
                    {
                        pass:'陈洋',
                        personal:'15236987512',
                        service:'12545635895'
                    }
                ]
                },
                {
                id: 3,
                rank: '大区2.4万 + 押金2千',
                money: '2.4万2千',
                member:[
                    {
                        pass:'猪精',
                        personal:'25369874512',
                        refer:'陈洋'
                    }
                ]
                },
                {
                id: 4,
                rank: 'VIP顾客2400元 + 押金0元',
                money: '2400',
                member:[
                    {
                        pass:'陈琴',
                        personal:'15797964844',
                        service:'12545635895'
                    }
                ]
                }
            ]
        }
    },
    components:{
        CheckerItem,
        Checker,
        Checklist,
        'material-checkbox': Checkbox
    },
    mounted() {
    },
    methods:{
        upgrade(){
            this.flag=true
        },
        close(){
            this.flag=false
        }
    }
}
</script>
<style lang="less">
    .check{
        .check_head{
            height: .44rem;
            line-height: .44rem;
            padding: 0 4.8%;
            text-align: center;
            font-size: .18rem;
            .back{
                float: left;
                width: .1rem;
                height: .16rem;
                margin-top: .15rem;
            }
        }
        .upgrade{
            width: 100%;
            height: 1.63rem;
            background: #5b50d3;
            .rank{
                width: 50%;
                height: 1.63rem;
                float: left;
                position: relative;
                .face{
                    width: .54rem;
                    height: .54rem;
                    border: 1px solid #fff;
                    border-radius: 50%;
                    margin-left: 40.5%;
                    margin-top: .32rem;
                }
                .grade{
                    width: 1.06rem;
                    height: .31rem;
                    position: absolute;
                    left: 27.2%;
                    top: .74rem;
                }
                p{
                    width: .7rem;
                    height: .27rem;
                    line-height: .27rem;
                    color: #fff;
                    position: absolute;
                    left: 36.8%;
                    top: .78rem;
                    text-align: center;
                    font-size: .15rem;
                }
            }
            .up{
                width: 50%;
                height: 1.63rem;
                float: left;
                position: relative;
                .up_img{
                    width: .82rem;
                    height: .82rem;
                    margin-left: 28.8%;
                    margin-top: .33rem;
                }
                span{
                    width: .42rem;
                    height: .42rem;
                    line-height: .42rem;
                    text-align: center;
                    position: absolute;
                    color: #5b50d3;
                    left: 39.2%;
                    top: .53rem;
                }
                
            }
        }
        .option_referer{
            .option{
            padding: 0 4.8%;
            border-bottom: 1px solid #ccc;
            .checkbox-wrapper{
                float: left;
            }
           span{
               height: .53rem;
               line-height: .53rem;
               font-size: .13rem;
            }
            img{
                width: .07rem;
                height: .13rem;
                float: right;
                margin-top: .2rem;
            }
            i{
                float: right;
                margin-top: .18rem;
                padding-right: 3%;
                color: #5b50d3;
            }
        }
        .referer{
            width: 88%;
            height:5.12rem;
            margin: .1rem auto;
            border-radius: .04rem;
            box-shadow: -2px 2px 2px #e5e5e5;
            border-bottom: 1px solid #ccc;
            >div{
                 &:nth-child(1){
                    width: 70%;
                    height: 1.1rem;
                    float: left;
                    p{
                        height: .27rem;
                        line-height: .27rem;
                        font-size: .13rem;
                        padding-left: 6%;
                        font-weight: bold;
                    }
                    &:nth-child(1){
                        margin-top: .15rem;
                    }
                }
                &:nth-child(2){
                    width: 30%;
                    height: 1.1rem;
                    float: left;
                    img{
                        width: .3rem;
                        height: .3rem;
                        border-radius: .02rem;
                        margin-top: .23rem;
                        margin-left: 47%;
                    }
                }
            }
           
            }
        }
        .shade{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            width: 100%;
            height: 100%;
            background-color: #000;
            opacity: 0.4;
            /*兼容IE8及以下版本浏览器*/
            filter: alpha(opacity=30);
            display: block;
        }
        .modal{
            position: absolute;
            z-index: 101;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 77.6%;
            height: 1.64rem;
            margin: auto;
            display: block;
            border-radius: 0.08rem;
            background: #fff;
            p{
                text-align: center;
                font-size: .13rem;
                color: #333;
                margin-top: .1rem;
                &:first-child{
                    font-size: .19rem;
                    font-weight: bold;
                    color: #000;
                    margin-top: .27rem;
                }
            }
            >div{
                width: 39%;
                height: .3rem;
                line-height: .3rem;
                background: #5b50d3;
                text-align: center;
                color: #fff;
                border-radius: .03rem;
                margin:.3rem auto;
            }
        }
        
    }
    .vux-checker-item{
        width: 100%;
        background: #fff;
    }
    .material-checkbox > span[data-v-3fe23622]::after{
        top: 12px !important;
    }
</style>

