<template>
  <div class="category">
    <!-- <div class="search">
      <input type="text" placeholder="搜索商品" @click="search" />
      <span @click="shop">取消</span>
    </div> -->
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
      <div v-if="goodsList.length === 0" style="text-align:center;">
        <img style="width:1.58rem;height:auto;margin-top:.82rem;" src="../../assets/images/nomore.png" />
            <p style="color:#9890ec;margin-top:.35rem;font-size:.15rem;">暂无商品</p>
            <p style="color:#9890ec;font-size:.15rem;">敬请精品上市</p>
      </div>
      <div class="shoppings">
        <div class="all">
          <div class="goods">
            <div v-for="(item,index) in goodsList" :key="index" class="goods-item">
              <GoodsItem :item="item" />
            </div>
            <infinite-loading @infinite="infiniteHandler" spinner="spiral" style="margin-top:2em" ref="sroller">
              <span slot="no-more">
                ---暂无更多商品---
              </span>
              <span slot="no-results">
              </span>
            </infinite-loading>
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
import Footer from '../../components/Footer'
import MallService from 'services/MallService'
import GoodsItem from 'components/GoodsItem'
import infiniteScroll from 'vue-infinite-scroll'
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: 'mall-index',
  directives: {
    infiniteScroll
  },
  components: {
    'v-footer': Footer,
    GoodsItem,
    InfiniteLoading
  },
  data() {
    return {
      title: '分类',
      activeClass: 'active',
      selectedTabId: '',
      busy: false,
      goodsList: [],
      categories: [],
      goods: true,
      page: 1
    }
  },
  methods: {
    search: function() {
      this.goods = false
    },
    shop: function() {
      this.goods = true
    },
    infiniteHandler: async function($state) {
      const result = (await MallService.getGoodsList(
        this.selectedTabId,
        this.page++
      )).data
      if (result.length) {
        this.goodsList = [...this.goodsList, ...result]
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  watch: {
    selectedTabId: async function(val) {
      this.$refs.sroller.stateChanger.reset()
      console.log(this.$refs.sroller)
      this.goodsList = []
      this.page = 1
      const result = (await MallService.getGoodsList(
        this.selectedTabId,
        this.page++
      )).data
      this.goodsList = result
      this.busy = false
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
  }
}
</script>
<style lang="less" scoped>
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
    font-size: 0.14rem;
  }
}
.warp {
  width: 100%;
  height: 0.44rem;
}
.category_nav {
  width: 100%;
  height: 0.44rem;
  background: #fff;
  // border-top: 1px solid #ccc;
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
  border-left: 0.02rem solid #5b50d3;
  margin-left: 4.8%;
  margin-top: 0.2rem;
  padding-left: 0.9%;
}
.history_topic {
  width: 100%;
  border-left: 0.02rem solid #5b50d3;
  margin-left: 4.8%;
  margin-top: 0.2rem;
  padding-left: 0.9%;
}

.category .wrap #category_nav li.active a {
  border-bottom: 0.04rem solid #5b50d3;
  padding: 0 0.14rem 0.1rem 0.14rem;
  color: #5b50d3;
}
a {
  color: #666;
}
.search {
  position: fixed;
  top: 0;
}
.wrap {
  position: fixed;
  //暂时屏蔽
  top: 0rem;
  // top: 0.44rem;
  width: 100%;
}
.category_container {
  min-height: 80vh;

  //暂时屏蔽
  margin-top: 44px;
  // margin-top: 0.9rem;
  background: #f6f6f6;
}
.search_goods {
  margin-top: 0.44rem;
}
.history_search {
  margin-top: 0;
}
</style>
