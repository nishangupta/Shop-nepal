import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import AddressBook from './pages/AddressBook'
import PaymentOption from './pages/PaymentOption'
import ProductList from './pages/ProductList'
import Product from './pages/Product'

const routes = [
  {
    path: '/',
    component: ProductList,
    name: 'productlist',
  },
  {
    path: '/shop',
    component: ProductList,
    name: 'productlist',
  },
  {
    path: '/profile',
    component: Profile,
    name: 'profile',
  },
  {
    path: '/address-book',
    component: AddressBook,
    name: 'addressbook',
  },
  {
    path: '/payment-option',
    component: PaymentOption,
    name: 'paymentOption',
  },

  {
    path: '/shop/product/:id',
    component: Product,
    name: 'product',
  },
  {
    path: '*',
    component: NotFound,
    name: 'notFound',
  },
]

export default routes
