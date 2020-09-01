import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/firestore'

import routes from './routes.js'

Vue.use(VueRouter)

firebase.initialize({
  apiKey: 'AIzaSyAi81-Qam0iHvJ2pJwLLMJ_Ga3iYwQf2-w',
  authDomain: 'vue-calendar-b876e.firebaseapp.com',
  databaseURL: 'https://vue-calendar-b876e.firebaseio.com',
  projectId: 'vue-calendar-b876e',
  storageBucket: 'vue-calendar-b876e.appspot.com',
  messagingSenderId: '423083130133',
  appId: '1:423083130133:web:77c1b018a0115026f67d1c',
  measurementId: 'G-1SEG4S419W',
})

export const db = firebase.firestore()

const router = new VueRouter({ mode: 'history', routes })

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
