import db from '@/fb'

const state = {
  products: [],
}

const getters = {
  allProducts: (state) => state.products,
  getProduct: (state) => {
    return function(id) {
      return state.products.find((p) => p.id == id)
    }
  },
}

const actions = {
  setProducts({ commit }) {
    let products = []
    db.collection('products').onSnapshot((res) => {
      let changes = res.docChanges()
      changes.forEach((change) => {
        if (change.type == 'added') {
          products.push({
            id: change.doc.id,
            ...change.doc.data(),
          })
        }
      })
    })
    commit('SET_PRODUCTS', products)
  },
  updateProduct({ commit }, { id, product }) {
    db.collection('products')
      .doc(id)
      .update(product)
      .then(commit('UPDATE_PRODUCT', { id, product }))
  },
  deleteProduct({ commit }, id) {
    db.collection('products')
      .doc(id)
      .delete()
      .then(() => commit('DELETE_PRODUCT', id))
  },
}

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },

  DELETE_PRODUCT(state, productId) {
    state.products = state.products.filter((p) => p.id !== productId)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
