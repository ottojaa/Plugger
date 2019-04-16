import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import App from './App.vue'
import UploadButton from 'vuetify-upload-button'

import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(UploadButton)

new Vue({
  render: h => h(App)
}).$mount('#app')
