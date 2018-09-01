<template>
    <div class="teamcash">
        <x-header :left-options="{backText: ''}">
          <span>团队业绩</span>
          <!-- <x-icon slot="right" type="more" size="35" style="fill:#333;position:relative;top:-8px;left:-3px;"></x-icon> -->
        </x-header>
        <div class="cash_point">
            <p class="all">总业绩</p>
            <p class="money">{{performance.performance}}<span>元</span></p>
        </div>
        <ul class="team_grades">
            <li class="first_month" v-for="(item,index) in teamcash">{{item.months}}团队业绩<span>{{item.credit}}</span></li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
import {XHeader} from 'vux';
export default {
    data(){
        return{
            performance:[],
            teamcash:[]
        }
    },
    components:{
        XHeader
    },
    mounted() {
        axios.get('http://124.200.40.10:17080/agent/api/v1/performance/info').then(res=>{
            // console.log(res)
            this.performance=res.data.data
        })
         axios.get('http://124.200.40.10:17080/agent/api/v1//performance/recordList').then(response=>{
            // console.log(response)
            this.teamcash=response.data.data
        })
    },
}
</script>
<style lang="less">
.teamcash{
    .teamcash_head{
        height:.44rem;
        line-height: .44rem;
        text-align: center;
        font-size: .18rem;
        padding: 0 4.8%;
        .back{
            float: left;
            width: .1rem;
            height: .16rem;
            margin-top: .15rem;
        }
    }
    .cash_point{
        width: 100%;
        height: 1.6rem;
        background: url('../../assets/images/team_bg.png') no-repeat center/cover;
        text-align: center;
        color: #fff;
        .all{
            padding-top: .44rem;
            font-size: .15rem;
        }
        .money{
            font-size: .18rem;
            padding-top: .05rem;
            font-weight: bold;
        }
    }
    .team_grades{
        width: 100%;
        margin-top: .1rem;
        .first_month{
            margin-top: 0;
        }
        li{
            height: .47rem;
            padding: 0 4.8%;
            background: #fff;
            margin-top: .05rem;
            line-height: .47rem;
            font-size: .13rem;
            font-weight: bold;
            span{
                float: right;
            }
        }
    }
}

</style>

