<template>
    <div class="home">
        
        <div class="swiper-container">
		  <div class="swiper-wrapper">
		    <div class="swiper-slide"><img src="../assets/images/banner_.png" /></div>
		    <div class="swiper-slide"><img src="../assets/images/banner2.png" /></div>
		    <div class="swiper-slide"><img src="../assets/images/3.jpg" /></div>
			<div class="swiper-slide"><img src="../assets/images/4.jpg" /></div>
			<div class="swiper-slide"><img src="../assets/images/5.jpg" /></div>
		  </div>
		  <div class="swiper-pagination"></div>
		</div>

		<div class="nav">
			<div><img src='../assets/images/team.png' /><p>我的团队</p></div>
			<div><img src='../assets/images/points.png' /><p>我的积分</p></div>
			<div><img src='../assets/images/authorising.png' /><p>我的授权书</p></div>
			<div><img src='../assets/images/cash.png' /><p>我的押金</p></div>
			<div><img src='../assets/images/grade.png' /><p>我的业绩</p></div>
			<div>其他</div>
		</div>
		<v-footer></v-footer>
    </div>
</template>
<script>
import Footer from './public/Footer.vue';
import '../../node_modules/swiper/dist/css/swiper.css';
import Swiper from 'swiper';
export default {
    data(){
        return{
            title:'首页内容'
        }
    },
    mounted(){
		var mySwiper = new Swiper('.swiper-container', {
				//autoplay: true,//可选选项，自动滑动
				autoplay: {
				delay: 1000//1秒切换一次
				},
				loop : true,
				pagination: {
				el: '.swiper-pagination'
				}
		})

        },
  components:{

    'v-footer':Footer
  }

}
</script>
<style>
.swiper-container{
    height: 2.08rem;
    width: 100%;
}
.swiper-slide{
	height: 100%;
    width: 100%;
}
.swiper-slide img{
	width: 100%;
	height: auto;
}
.nav{
	width: 100%;
	height: 3.95rem;
}
.nav div{
	display: block;
	width: 44.6%;
	height: 1.14rem;
	margin-top: .1rem;
	font-size: .18rem;
	color: #fff;
	text-align: center;
}
.nav div p{
	display: block;
	height: .16rem;
	margin-top: .07rem;
}
.nav div:nth-child(2n-1){
	float: left;
	margin-left: 3.6%;
}
.nav div:nth-child(2n){
	float: right;
	margin-right: 3.6%;
}
.nav div:nth-child(1){
	background: #8c82ff;
}
.nav div:nth-child(1) img{
	display: block;
	width: .43rem;
	height: .35rem;
	margin-left: 36.3%;
	margin-top: .27rem;
}
.nav div:nth-child(2) img{
	display: block;
	width: .4rem;
	height: .39rem;
	margin-left: 37.5%;
	margin-top: .24rem;
}
.nav div:nth-child(3) img{
	display: block;
	width: .43rem;
	height: .35rem;
	margin-left: 39.4%;
	margin-top: .27rem;
}
.nav div:nth-child(4) img{
	display: block;
	width: .32rem;
	height: .37rem;
	margin-left: 40%;
	margin-top: .26rem;
}
.nav div:nth-child(5) img{
	display: block;
	width: .4rem;
	height: .35rem;
	margin-left: 37.8%;
	margin-top: .27rem;
}
.nav div:nth-child(6){
	line-height: 1.14rem;
}
.nav div:nth-child(2){
	background: #ff6267;
}
.nav div:nth-child(3){
	background: #48d0f2;
}
.nav div:nth-child(4){
	background: #ff9655;
}
.nav div:nth-child(5){
	background: #c38eff;
}
.nav div:nth-child(6){
	background: #ff7fb0;
}
.swiper-pagination-bullet{
	width: 12px;
	height: 3px;
	display: inline-block;
	border-radius: 0;
	background: #fff;
	box-shadow: 2px 2px 2px grey;
}
.swiper-pagination-bullet-active{
	width: 9px;
	height: 9px;
	border-radius:50%;
	border:2px #fff solid;
	background-color:#ccc;
	opacity: 1;
	box-shadow: 2px 2px 2px grey;
}
.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
	bottom: 8px;
}
</style>

