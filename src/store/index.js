import Vue from 'vue'
import Vuex from 'vuex'
//modules
import product from './modules/product'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product,
  },
})
