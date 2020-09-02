import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    themes: {
      light: {
        primary: '#16849B',
        secondary: '#F57224',
        success: '#3cd1c2',
        info: '#3F66DA',
        error: '#F64341',
      },
    },
  },
})
