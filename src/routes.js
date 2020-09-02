import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import AddressBook from './pages/AddressBook'
import PaymentOption from './pages/PaymentOption'

const routes = [
  {
    path: '/',
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
    path: '*',
    component: NotFound,
    name: 'notFound',
  },
]

export default routes
