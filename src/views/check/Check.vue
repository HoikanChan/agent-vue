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
                <span>升级</span>
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
                        <p>
                            <img src="../../assets/images/22.jpg" />
                            <span>审核人：<i>{{man.pass}}</i></span>
                        </p>
                        <h6>
                            <span>电话号码:<i>{{man.personal}}</i></span><span>客服号码:<i>{{man.service}}</i></span>
                        </h6>
                    </div>
                </div>
            </checker-item>
        </checker>
    </div>
</template>

<script>
import { XHeader, Checker, CheckerItem,Checklist } from 'vux'
import Checkbox from 'components/Checkbox'
export default {
    data(){
        return{
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
                        service:'12545635895'
                    }
                ]
                },
                {
                id: 4,
                rank: 'VIP顾客2400元 + 押金0元',
                money: '2400',
                member:[
                    {
                        pass:'茉莉',
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
        $('option_referer .option').click(function(){
            $('option_referer .referer').eq(this.index()).show()
        })
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
            width: 100%;
            height:.8rem;
            padding: 0 7.2%;
            border-bottom: 1px solid #ccc;
            display:none;
            p{
                height: .42rem;
                line-height: .42rem;
                img{
                    width: .22rem;
                    height: .22rem;
                    border-radius: 50%;
                }
                span{
                    font-size: .13rem;
                    color: #666;
                }
            }
            h6{
                font-weight: normal;
                height: .23rem;
                line-height: .23rem;
                font-size: .13rem;
                span{
                    &:nth-child(2){
                        padding-left: 5.6%;
                    }
                }
            }
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

