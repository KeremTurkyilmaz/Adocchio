import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index'
import './assets/styles/main.scss'

Vue.config.productionTip = false

const app = new Vue({
	render: h => h(App),
	store
}).$mount('#app')
