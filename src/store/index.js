import Vue from 'vue'
import Vuex from 'vuex'
//modules
import product from './modules/product'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product,
    cart,
  },
})
