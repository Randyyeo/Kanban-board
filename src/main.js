import Vue from 'vue'
import App from './App.vue'
import "bootstrap"
import 'bootstrap/dist/css/bootstrap.css'
import AOS from 'aos';
import 'aos/dist/aos.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  mounted(){
    AOS.init()
  }
}).$mount('#app')
