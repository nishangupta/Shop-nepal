const state = {
  cart: [
    {
      id: 1,
      name:
        'mosjamtasdahsdhjnaskldfml khsdfjk akjsd fkjasdjkf hjksadhf kjasdhk fhaskd f hjkfhsjkdfhakjsdhfkjagshdk f',
      quantity: 1,
      price: 100,
    },
    {
      id: 3,
      name: 'mosjamtasakjsdhfkjagshdk f',
      quantity: 1,
      price: 5000,
    },
    {
      id: 2,
      name: 'mosjamtasdahsdhjnaskldfml khsdfjk ahakjsdhfkjagshdk f',
      quantity: 1,
      price: 5000,
    },
  ],
}

const getters = {
  cartItemCount(state) {
    return state.cart.length
  },
  cartTotalPrice(state) {
    let total = 0
    state.cart.forEach((p) => {
      total += p.price
    })
    return total
  },
  getCartItems(state) {
    return state.cart
  },
  // setCart({ commit }) {
  //   return state.cart
  // },
}

const actions = {
  cartIncrement({ commit }, id) {
    commit('CART_INCREMENT', id)
  },
  cartDecrement({ commit }, id) {
    commit('CART_DECREMENT', id)
  },
}

const mutations = {
  CART_INCREMENT(state, id) {
    let cartItem = state.cart.find((c) => c.id == id)
    cartItem.quantity++
  },
  CART_DECREMENT(state, id) {
    let cartItem = state.cart.find((c) => c.id == id)
    if (cartItem.quantity > 1) {
      cartItem.quantity--
    }
    return
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
