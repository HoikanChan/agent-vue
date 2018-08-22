<template>
  <div class="category">
    <div class="search">
      <input type="text" placeholder="搜索商品" @click="search" />
      <span @click="shop">取消</span>
    </div>
    <div class="wrap" v-if="goods">
      <ul class="category_nav" id="category_nav">
        <li v-for="item in categories" :key="item.category" 
          v-bind:class="[$route.meta.category === item.category ? activeClass : '']">
          <router-link :to="item.to">{{item.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="category_container" v-if="goods">
      <div class="shoppings">
        <router-view></router-view>
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
export default {
  data() {
    return {
      title: '分类',
      activeClass: 'active',
      categories: [
        {
          to: '/mall/all',
          title: '全部',
          category: 'all'
        },
        {
          to: '/mall/skin',
          title: '护肤',
          category: 'skin'
        },
        {
          to: '/mall/beauty',
          title: '美妆',
          category: 'beauty'
        },
        {
          to: '/mall/perfume',
          title: '香水',
          category: 'perfume'
        }
      ],
      goods: true
    }
  },
  mounted() {
    $('.category_nav li').click(function() {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')
    })
  },
  methods: {
    search: function() {
      this.goods = false
    },
    shop: function() {
      this.goods = true
    }
  },
  mounted() {
    console.log(this.$route.meta.category)
  },
  components: {
    'v-footer': Footer
  }
}
</script>
<style>
@import url('../../assets/css/category.css');

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
  margin-top: 0.9rem;
}
.search_goods {
  margin-top: 0.44rem;
}
.history_search {
  margin-top: 0;
}
</style>
