<template>
    <div class="address">
       <ul class="address_msg">
           <li><span>收货人</span><input type="text" /></li>
           <li><span>联系电话</span><input type="number" /></li>
           <li><span>所在地</span></li>
           <li><span>详细地址</span><input type="text" /></li>
       </ul>
       <div class="keep">保存</div>
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
<style scoped>
body{
    background: #f8f8f8;
}
.address_msg{
    background: #fff;
}
.address_msg li{
    width: 90.4%;
    height: .5rem;
    line-height: .5rem;
    font-size: .13rem;
    padding:0 4.8%;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
}
.address_msg li input{
    width: 75%;
    height: .5rem;
    border: none;
    float: right;
}
.keep{
    width: 90.4%;
    height: .44rem;
    font-size: .16rem;
    color: #fff;
    line-height: .44rem;
    text-align: center;
    background: #d60000;
    margin: 1.65rem auto;
    border-radius: .03rem;
}
</style>

