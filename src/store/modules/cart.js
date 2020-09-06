import db, { fauth } from '@/fb'
const state = {
  /* cart is an array of product objects*/
  cart: [],
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
}

const actions = {
  setCart({ commit }) {
    let user = fauth.currentUser.uid
    let cartRef = db.collection('cart').doc(user)
    cartRef.get().then((res) => {
      if (res.exists) {
        commit('SET_CART', res.data().products)
      } else {
        commit('SET_CART', [])
      }
    })
  },
  cartIncrement({ commit }, id) {
    commit('CART_INCREMENT', id)
  },
  cartDecrement({ commit }, id) {
    commit('CART_DECREMENT', id)
  },
  addToCart({ commit }, id) {
    let user = fauth.currentUser.uid
    let cart = []
    const cartRef = db.collection('cart').doc(user)
    cartRef.get().then((snapshot) => {
      if (snapshot.exists) {
        cart = snapshot.data().products
        cart = cart.filter((c) => c !== id)
        cart.push(id)
        cartRef
          .update({
            products: cart,
          })
          .then(
            () => {
              commit('ADD_TO_CART', id)
            },
            (err) => alert(err.message)
          )
      } else {
        cart = [id]
        cartRef
          .set({
            products: cart,
          })
          .then(
            () => {
              commit('ADD_TO_CART', id)
            },
            (err) => alert(err.message)
          )
      }
    })
  },
  removeCart({ commit }, productId) {
    let user = fauth.currentUser.uid
    let products = []
    let cartRef = db.collection('cart').doc(user)
    cartRef.get().then((res) => {
      products = res.data().products
      let newProducts = products.filter((p) => p != productId)
      cartRef
        .update({
          products: newProducts,
        })
        .then(
          () => {
            commit('REMOVE_FROM_CART', productId)
          },
          (err) => {
            alert(err.message)
          }
        )
    })
  },
  //removes cart products for firebase
  removeAllCart({ commit }) {
    const user = fauth.currentUser.uid
    db.collection('cart')
      .doc(user)
      .update({
        products: [],
      })
      .then(
        () => {
          commit('CLEAR_ALL_CART')
        },
        (err) => alert(err.message)
      )
  },
  //removes cart from state
  clearCart({ commit }) {
    commit('CLEAR_ALL_CART')
  },
}

const mutations = {
  SET_CART(state, productIds) {
    let cart = []
    if (productIds.length) {
      productIds.forEach((p) => {
        db.collection('products')
          .doc(p)
          .get()
          .then((res) => {
            cart.push({
              id: res.id,
              quantity: 1,
              ...res.data(),
            })
          })
      })
    }
    state.cart = cart
  },
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

  ADD_TO_CART(state, id) {
    let cartExists = state.cart.find((c) => c.id === id)
    if (!cartExists) {
      //add new product to the cart state
      let cartRef = db.collection('products').doc(id)

      cartRef.get().then((res) => {
        if (res.exists) {
          state.cart.push(res.data())
        } else {
          alert('Product has been removed')
        }
      })
    }
  },
  REMOVE_FROM_CART(state, id) {
    state.cart = state.cart.filter((p) => p.id !== id)
  },
  CLEAR_ALL_CART(state) {
    state.cart = []
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
