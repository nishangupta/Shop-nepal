import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyDdamUeW6N8NyvzLW5N-scRyENhVOJDeYc',
  authDomain: 'shop-nepal.firebaseapp.com',
  databaseURL: 'https://shop-nepal.firebaseio.com',
  projectId: 'shop-nepal',
  storageBucket: 'shop-nepal.appspot.com',
  messagingSenderId: '959815205077',
  appId: '1:959815205077:web:fbadd22ce6875ecdf9a25c',
  measurementId: 'G-6BK23YFSB2',
})
export const fauth = firebase.auth()
export const fbase = firebase
export default firebase.firestore()
