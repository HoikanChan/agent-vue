<template>
    <div class="examine">
        <x-header :left-options="{backText: ''}">审核</x-header>
        <div class="tab">
            <div>
                <img src="../../assets/images/register_check.png" /><img src="../../assets/images/register_check_.png" />
                <p>注册审核</p>
            </div>
            <div>
                <img src="../../assets/images/upgrade_check.png" /><img src="../../assets/images/upgrade_check_.png" />
                <p>升级审核</p>
            </div>
        </div>
    </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
    data(){
        return{}

    },
    components:{
        XHeader
    }
}
</script>
<style lang="less">
    .examine{
        .tab{
            width: 100%;
            height: 1.1rem;
            border-top: 1px solid #ccc;
            background: #fff;
            >div{
                width: 50%;
                height: 1.1rem;
                float: left;
                text-align: center;
                img{
                    margin-top: .3rem;
                }
                &:first-child{
                    img{
                        width: .4rem;
                        height: .37rem;
                    }
                }
                &:nth-child(2){
                    img{
                        width: .39rem;
                        height: .37rem;
                    }
                    
                }
                
            }
        }
    }
    .show{
        color: #5b50d3;
    }
</style>


