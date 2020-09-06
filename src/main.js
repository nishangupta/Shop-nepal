import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import store from '@/store'
import { fauth } from '@/fb'

import router from '@/routes'

let app
fauth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      store,
      router,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app')
  }
})
