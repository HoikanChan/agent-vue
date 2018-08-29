<template>
    <div class="authorization">
        <x-header :left-options="{backText: ''}">我的授权书</x-header>
        <div class="authorize">
            <img src="../../assets/images/authorization.png"/>
        </div>
    </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
    data(){
        return{

        }
    },
    components:{
        XHeader
    }
}
</script>
<style lang='less'>

    .authorization{
        .authorize{
                // background: url('../../assets/images/authorization.png') no-repeat center;
                // background-size: cover;
                img{
                    width: 100%;
                    height: auto;
                }
            
        }
    }
</style>


