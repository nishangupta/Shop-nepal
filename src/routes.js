import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import AddressBook from './pages/AddressBook'
import PaymentOption from './pages/PaymentOption'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import AddProduct from './pages/AddProduct'
import ManageProduct from './pages/ManageProduct'
import LoginPage from './pages/LoginPage'
import Cart from './pages/Cart'

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
  },
  {
    path: '/manage-product',
    component: ManageProduct,
    name: 'manageProduct',
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
    path: '/shop/cart',
    component: Cart,
    name: 'cart',
  },
  {
    path: '/product/add-product',
    component: AddProduct,
    name: 'addproduct',
  },
  {
    path: '/product/manage-products',
    component: ManageProduct,
    name: 'manageProduct',
  },
  {
    path: '*',
    component: NotFound,
    name: 'notFound',
  },
]

export default routes
