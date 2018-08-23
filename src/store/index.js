import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    loading: false,
    shoppingCart: [],
    address: null
  },

  mutations: {
    setAddress: (state, address) => {
      state.address = address
    },
    //添加购物车
    addGoods: (state, item) => {
      state.shoppingCart.push(item)
    },
    //删除购物车商品
    removeGoods: (state, id) => {
      state.shoppingCart = state.shoppingCart.filter(item => id !== item.poiId)
    },
    //清除购物车
    clearAll(state) {
      state.shoppingCart = []
    }
  },

  actions: {
    //添加购物车
    addGoods: (state, item) => {
      console.log(item)
      commit('addGoods', item)
    },
    //删除购物车商品
    removeGoods: (state, id) => {
      commit('removeGoods', id)
    },
    //清除购物车
    clearAll(state) {
      commit('clearAll', token)
    },
    setAddress: (state, address) => {
      commit('setAddress', address)
    }
  },

  getters: {
    getAddress(state) {
      return state.address
    },
    shoppingBills(state, getters) {
      let result = {}
      state.shoppingCart.forEach(product => {
        if (result[product.poiId]) {
          result[product.poiId].amount++
        } else {
          result[product.poiId] = {
            amount: 1,
            ...product
          }
        }
      }, [])
      return result
    }
  }
})

export default store
