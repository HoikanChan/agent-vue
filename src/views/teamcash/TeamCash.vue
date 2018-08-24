<template>
    <div class="teamcash">
        <div class="teamcash_head">
            <img class="back" src="../../assets/images/back.png" />
            团队业绩
        </div>
        <div class="cash_point">
            <p class="all">总业绩</p>
            <p class="money">1213800.00<span>元</span></p>
        </div>
        <ul class="team_grades">
            <li class="first_month">07月01日到07月31日团队业绩<span>8888</span></li>
            <li>08月01日到08月31日团队业绩<span>9999</span></li>
        </ul>
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
.teamcash{
    .teamcash_head{
        width: 100%;
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
            width: 100%;
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

