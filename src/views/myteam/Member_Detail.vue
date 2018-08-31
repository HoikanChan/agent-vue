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
        <div class="level">
            <router-link to="#" @click="tabNow='partner'">
                <p class="first" >0</p>
               
                <p class="second">官方合伙人</p>
            </router-link>
            <router-link to="#">
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
            </router-link>
        </div>
        <div>
            <ul>
                <li v-for=>
                    <img class="jpg" src="../../assets/images/15.jpg" />
                    <span>官方合伙人</span>
                    <img class="right" src="../../assets/images/right.png" />
                </li>
            </ul>
            <ul class="members" v-show="tabNow==='all'">
                <li>
                    <img class="jpg" src="../../assets/images/15.jpg" />
                    <span>总代</span>
                    <img class="right" src="../../assets/images/right.png" />
                </li>
            </ul>
            <ul>
                <li v-for="(item,key) in member[1]" :key="key">
                    <img class="jpg" src="../../assets/images/15.jpg" />
                    <span>大区</span>
                    <img class="right" src="../../assets/images/right.png" />
                </li>
            </ul>
            <ul>
                <li v-for="(item,key) in member[0]" :key="key">
                    <img class="jpg" src="../../assets/images/15.jpg" />
                    <span>VIP</span>
                    <img class="right" src="../../assets/images/right.png" />
                </li>
            </ul>
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

