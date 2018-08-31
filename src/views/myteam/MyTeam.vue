<template>
    <div class="myteam">
        <div class="team_head">
            <img class="back" src="../../assets/images/back.png" />
            我的团队
            <img class="cash" src="../../assets/images/team_cash.png" />
            
        </div>
        <div class="agency">
            <input @click="$router.push({name:'teamsearch'})" type="text" placeholder="搜索代理名称"/>
            <img class="img" src="../../assets/images/team_search.png" />
            <!-- <span style="font-size:.16rem;color:#fff;float:right;">确定</span> -->
            <div class="realtion">
                <p class="man">我的推荐人</p>
                <img class="head" src="../../assets/images/20.jpg" />
                <p class="mantwo">{{referrer}}</p>
            </div>
            <img class="relate" src="../../assets/images/relation.png" />
             <div class="realtion_">
                <p class="man_">直属上级</p>
                <img class="head_" src="../../assets/images/20.jpg" />
                <p class="mantwo_">{{direct}}</p>
            </div>
        </div>
        <div class="level">
            <a @click="tabNow='partner'" v-for="(item,key) in member" :key="key">
                <p class="first" >{{item.count}}</p>
                <p class="second">{{key}}</p>
            </a>
            <!-- <router-link to="#">
                <p class="first" @click="tabNow='all'">10</p>
                <p class="second">总代</p>
            </router-link>
            <router-link to="#">
                <p class="first" @click="tabNow='big'">10</p>
                <p class="second">大区</p>
            </router-link>
            <router-link to="#" class="none" @click="tabNow='vip'">
                <p class="first">10</p>
                <p class="second">VIP</p>
            </router-link> -->
        </div>
        <div>
            <ul class="members" v-show="tabNow==='partner'">
                <li v-for="(item,key) in member[2]" :key="key">
                    <img class="jpg" src="../../assets/images/15.jpg" />
                    <span>{{key}}</span>
                    <img class="right" src="../../assets/images/right.png" />
                </li>
            </ul>
            <ul class="members" v-show="tabNow==='all'">
                <li v-for="(item,key) in member[3]" :key="key">
                    <img class="jpg" src="../../assets/images/15.jpg" />
                    <span>{{key}}</span>
                    <img class="right" src="../../assets/images/right.png" />
                </li>
            </ul>
            <ul class="members" v-show="tabNow==='big'">
                <li v-for="(item,key) in member[1]" :key="key">
                    <img class="jpg" src="../../assets/images/15.jpg" />
                    <span>{{key}}</span>
                    <img class="right" src="../../assets/images/right.png" />
                </li>
            </ul>
            <ul class="members" v-show="tabNow==='vip'">
                <li v-for="(item,key) in member[0]" :key="key">
                    <img class="jpg" src="../../assets/images/15.jpg" />
                    <span>{{key}}</span>
                    <img class="right" src="../../assets/images/right.png" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            msg:'我的团队',
            list:[],
            tabNow:['partner','all','big','vip'],
            referrer:'',
            direct:'',
            member:[]
        }
    },
    mounted() {
        axios.get('http://124.200.40.10:17080/agent/api/v1/team/referrer').then((response)=>{
            this.referrer=response.data.data.username
            axios.get('http://124.200.40.10:17080/agent/api/v1/team/parent').then((res)=>{
                this.direct=res.data.data.username
            })
            axios.get('http://124.200.40.10:17080/agent/api/v1/team/children').then((result)=>{
                // console.log(result.data.data)
                this.member=result.data.data
                console.log(this.member)
                // console.log(JSON.stringify(this.member))
            })
        })

    },
}
</script>
<style lang="less">
    .myteam{
        .team_head{
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
        .agency{
            width: 100%;
            height: 1.42rem;
            background: #5b50d3;
            position: relative;
            input{
                display: inline-block;
                width: 59.2%;
                height: .28rem;
                line-height: .28rem;
                background: #fff;
                margin-top: .14rem;
                margin-left: 11.4%;
                padding-left: 18%;
                border-radius: .03rem;
                font-family: '苹方';
                font-size: .13rem;
            }
            .img{
                width: .16rem;
                height: .16rem;
                position: absolute;
                left: 24.1%;
                top:.19rem;
            }
            .realtion{
                width: 21.4%;
                height: .77rem;
                margin-left: 19.2%;
                margin-top: .11rem;
                text-align: center;
                float: left;
                .man{
                    color: #fff;
                    height: .24rem;
                    line-height: .24rem;
                }
                .head{
                    width: .3rem;
                    height: .3rem;
                    position: inherit;
                    border-radius: 50%;
                    border: 1px solid #fff;
                }
                .mantwo{
                    color: #fff;
                    height: .2rem;
                    line-height: .2rem;
                }
            }
            .relate{
                float: left;
                width: .46rem;
                height: .15rem;
                margin-top: .44rem;
                margin-left: 3.3%;
            }
            .realtion_{
                width: 21.4%;
                height: .77rem;
                margin-left: 3.3%;
                margin-top: .11rem;
                text-align: center;
                float: left;
                .man_{
                    color: #fff;
                    height: .24rem;
                    line-height: .24rem;
                }
                .head_{
                    width: .3rem;
                    height: .3rem;
                    position: inherit;
                    border-radius: 50%;
                    border: 1px solid #fff;
                }
                .mantwo_{
                    color: #fff;
                    height: .2rem;
                    line-height: .2rem;
                }
            }
        }
        .level{
            width: 100%;
            height: .71rem;
            background: #fff;
            a{
                display: block;
                width: 24.7%;
                height: .4rem;
                float: left;
                text-align: center;
                border-right: 1px solid #ccc;
                margin-top: .15rem;
                font-size: .13rem;
                .first{
                    height: .17rem;
                    line-height: .17rem;
                }
                .second{
                    height: .22rem;
                    line-height: .22rem;
                    margin-top: 0;
                }
                &:last-child{
                    border-right: none;
                }
            }
            .none{
                border-right: none;
            }
          
        }
        .members{
            background: #fff;
            margin-top: .1rem;
            li{
                height: .53rem;
                line-height: .53rem;
                border-bottom: 1px solid #ccc;
                padding: 0 4.8%;
                .jpg{
                    width: .33rem;
                    height: .33rem;
                    border-radius: 50%;
                }
                span{
                    margin-top: .2rem;
                    margin-left: 2%;
                }
                .right{
                    width: .09rem;
                    height: .16rem;
                    margin-top: .19rem;
                }
            }
        }
    }
</style>
