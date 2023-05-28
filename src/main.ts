import Vue from 'vue'
import store from './store'
import App from './App.vue'

import './assets/colors.scss'
import './assets/heading/typographies.scss'


new Vue({
  pinia: store,
  render: (h) => h(App),
}).$mount('#app')
