import CoreuiVue from '@coreui/vue'
import Vue from 'vue'
import App from './App.vue'
import { iconsSet as icons } from './assets/icons/icons'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.use(CoreuiVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount('#app')
