import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import store from './store'

import routes from './routes.js'

Vue.use(VueRouter)

const router = new VueRouter({ mode: 'history', routes })

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
