import Vue from 'vue'
import VueRouter from 'vue-router'
import { fauth } from '@/fb'

import NotFound from '@/pages/NotFound'
import Profile from '@/pages/Profile'
import AddressBook from '@/pages/AddressBook'
import PaymentOption from '@/pages/PaymentOption'
import Voucher from '@/pages/Voucher'
import ProductList from '@/pages/ProductList'
import Product from '@/pages/Product'
import AddProduct from '@/pages/AddProduct'
import ManageProduct from '@/pages/ManageProduct'
import LoginPage from '@/pages/LoginPage'
import Cart from '@/pages/Cart'

//set up router
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ProductList,
    name: 'productlist',
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'loginPage',
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/product/manage-product',
    component: ManageProduct,
    name: 'manageProduct',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    component: Profile,
    name: 'profile',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/address-book',
    component: AddressBook,
    name: 'addressbook',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/vouchers',
    component: Voucher,
    name: 'voucher',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/payment-option',
    component: PaymentOption,
    name: 'paymentOption',
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/shop/product/:id',
    component: Product,
    name: 'product',
  },
  {
    path: '/shop/cart',
    component: Cart,
    name: 'cart',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/product/add-product',
    component: AddProduct,
    name: 'addproduct',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '*',
    component: NotFound,
    name: 'notFound',
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView()
  },
})

router.beforeEach((to, from, next) => {
  //check for required auth guard
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!fauth.currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (fauth.currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
        },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
