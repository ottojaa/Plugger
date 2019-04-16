import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import App from './App.vue'
import UploadButton from 'vuetify-upload-button'
import VueRouter from 'vue-router'
import Routes from './routes'

import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(UploadButton)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: Routes
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
