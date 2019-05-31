import Vue from 'vue'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
import Snotify from 'vue-snotify'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueClipboard)
Vue.use(Snotify)
Vue.use(BootstrapVue)
new Vue({
  render: h => h(App),
}).$mount('#app')
