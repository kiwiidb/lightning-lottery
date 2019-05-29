import Vue from 'vue'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
import Snotify from 'vue-snotify'

Vue.config.productionTip = false

Vue.use(VueClipboard)
Vue.use(Snotify)
new Vue({
  render: h => h(App),
}).$mount('#app')
