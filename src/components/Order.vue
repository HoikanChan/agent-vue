<template>
    <div class="order">
        <div class="place">
            <router-link to="/address">点击填写收货人信息</router-link>
        </div>
        <ul class="order_list">
            <li>
                <div><img src="../assets/images/8.jpg" /></div>
                <div>
                    <p>好吃的可爱多<span>(10支/一盒)</span></p>
                    <p>产品信息<span>10支/一盒</span></p>
                    <p>乳液体</p>
                    <p>￥990.00</p><span class="number">×12</span>
                </div>
            </li>
        </ul>
        <ul class="information">
            <li><span>买家留言</span><input type="text" placeholder="   选填：对本次交易的说明" /></li>
            <li><span>商品总格</span><i>￥1800</i></li>
            <li><span>运费</span><i>货到付款</i></li>
            <li><span>当前积分</span><i>12138</i></li>
        </ul>
        <div class="accont"><p>消耗积分：<span>1800</span></p><p>共<i>2</i>件商品</p></div>
        <div class="order_footer">
            <div><p>消耗积分：<span>1800</span></p><p>合计金额：</p></div>
            <div>提交订单</div>
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
<style scoped>
@import url('../assets/css/order.css');
</style>

