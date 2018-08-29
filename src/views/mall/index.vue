<template>
  <div class="category">
    <div class="search">
      <input type="text" placeholder="搜索商品" @click="search" />
      <span @click="shop">取消</span>
    </div>
    <div class="wrap" v-if="goods">
      <ul class="category_nav" id="category_nav">
        <li v-for="item in categories" :key="item.id" v-bind:class="[selectedTabId===item.id ? activeClass : '']" @click="selectedTabId=item.id">
          <a href="#">
            {{item.name}}
          </a>
        </li>
      </ul>
    </div>
    <div class="category_container" v-if="goods">
      <div class="shoppings">
        <div class="all">
          <div class="goods">
            <div v-for="(item,index) in goodsList" :key="index">
              <GoodsItem :item="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="search_goods" v-else>
      <div class="hot_search">
        <p class="hot_topic">热门搜索</p>
        <div>
          <router-link to="#">丰胸精油</router-link>
          <router-link to="#">护肤</router-link>
          <router-link to="#">洗发水</router-link>
        </div>
      </div>
      <div class="history_search">
        <p class="history_topic">历史搜索</p>
        <div>
          <router-link to="#">丰胸精油</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Footer from '../../components/public/Footer.vue'
import MallService from 'services/MallService'
import GoodsItem from 'components/GoodsItem'

export default {
  name: 'mall-index',
  components: {
    'v-footer': Footer,
    GoodsItem
  },
  data() {
    return {
      title: '分类',
      activeClass: 'active',
      selectedTabId: '',
      goodsList: [
        {
          poiId: 3271694,
          frontImg:
            'http://p0.meituan.net/600.600/deal/__38666717__4597520.jpg',
          title: '拉图牛排馆',
          avgScore: 3.9,
          allCommentNum: 3561,
          address: '北站/建设路建设路35-1号后座（金城广场斜对面）',
          avgPrice: 45,
          dealList: []
        }
      ],
      categories: [],
      goods: true
    }
  },
  methods: {
    search: function() {
      this.goods = false
    },
    shop: function() {
      this.goods = true
    }
  },
  watch: {
    selectedTabId: async function(val) {
      const goodsList = (await MallService.getGoodsList(val)).data
      this.goodsList = goodsList
    }
  },
  async mounted() {
    const categoryList = (await MallService.getCategory()).data.categoryList
    if (Array.isArray(categoryList)) {
      this.categories = [
        {
          id: '',
          name: '全部'
        }
      ].concat(categoryList)
    }
    const goodsList = (await MallService.getGoodsList()).data
    this.goodsList = goodsList
  }
}
</script>
<style lang="less">
@import url('../../assets/css/all.css');

@color_1: #b3b3b3;
@color_2: #000;

.search {
  width: 100%;
  height: 0.44rem;
  background: #f6f6f6;
  input {
    width: 64.6%;
    height: 0.28rem;
    background: #e7e7e7;
    margin: 0.08rem auto;
    margin-left: 4.8%;
    border-radius: 0.025rem;
    color: @color_1;
    padding-left: 18%;
  }
  span {
    color: @color_2;
    font-weight: bold;
    padding-left: 1.5%;
  }
}
.warp {
  width: 100%;
  height: 0.44rem;
  overflow-x: auto;
}
.category_nav {
  width: 100%;
  height: 0.44rem;
  background: #fff;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  li {
    width: 25%;
    height: 0.44rem;
    height: 0.44rem;
    line-height: 0.44rem;
    float: left;
    text-align: center;
  }
  a {
    font-size: 0.14rem;
    padding: 0 0.1rem 0.08rem 0.1rem;
  }
}
.goods {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding-bottom: 0.5rem;
  > div {
    width: 44%;
    height: 2.67rem;
    background: #fff;
    margin-top: 0.1rem;
    &:nth-child(2n& + 1) {
      margin-left: 4.8%;
      float: left;
    }
    &:nth-child(2n) {
      margin-right: 4.8%;
      float: right;
    }
    .good_img {
      width: 100%;
      height: 1.67rem;
      img {
        width: 100%;
        height: 1.67rem;
      }
    }
    .good_name {
      width: 95%;
      height: 0.37rem;
      line-height: 0.37rem;
      font-size: 0.14rem;
      font-weight: 600;
      padding-left: 5%;
    }
    .good_container {
      width: 90%;
      height: 0.32rem;
      margin-left: 5%;
      font-size: 0.12rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .good_price {
      width: 90%;
      height: 0.31rem;
      line-height: 0.31rem;
      margin-left: 5%;
      font-weight: bold;
      font-size: 0.14rem;
    }
  }
}
.empty {
  width: 100%;
  height: 0.5rem;
}
.hot_search {
  width: 100%;
  height: 0.92rem;
  border-top: 1px solid #ccc;
  padding-bottom: 0.1rem;
  > div {
    width: 90.4%;
    padding-left: 3%;
    padding-right: 4.8%;
    margin-top: 0.1rem;
    a {
      display: inline-block;
      height: 0.28rem;
      line-height: 0.28rem;
      margin-top: 0.1rem;
      padding: 0 0.15rem;
      background: #e7e7e7;
      margin-left: 1.5%;
      color: @color_2;
      border-radius: 0.02rem;
      font-weight: bold;
    }
  }
}
.history_search {
  width: 100%;
  height: 0.92rem;
  border-top: 1px solid #ccc;
  padding-bottom: 0.1rem;
  > div {
    width: 90.4%;
    padding-left: 3%;
    padding-right: 4.8%;
    margin-top: 0.1rem;
    a {
      display: inline-block;
      height: 0.28rem;
      line-height: 0.28rem;
      margin-top: 0.1rem;
      padding: 0 0.15rem;
      background: #e7e7e7;
      margin-left: 1.5%;
      color: @color_2;
      border-radius: 0.02rem;
      font-weight: bold;
    }
  }
}
.hot_topic {
  width: 100%;
  border-left: 0.02rem solid #d60000;
  margin-left: 4.8%;
  margin-top: 0.2rem;
  padding-left: 0.9%;
}
.history_topic {
  width: 100%;
  border-left: 0.02rem solid #d60000;
  margin-left: 4.8%;
  margin-top: 0.2rem;
  padding-left: 0.9%;
}

.category .wrap #category_nav li.active a {
  border-bottom: 0.04rem solid #de3338;
  padding: 0 0.1rem 0.08rem 0.1rem;
  color: #de3338;
}
a {
  color: #999;
}
.search {
  position: fixed;
  top: 0;
}
.wrap {
  position: fixed;
  top: 0.44rem;
  width: 100%;
}
.category_container {
  min-height: 80vh;
  margin-top: 0.9rem;
  background: #f6f6f6;
}
.search_goods {
  margin-top: 0.44rem;
}
.history_search {
  margin-top: 0;
}
</style>
