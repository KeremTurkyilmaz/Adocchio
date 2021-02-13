import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index'
import './assets/styles/main.scss'

Vue.config.productionTip = false

const defaultConfig = {
	modulo: 150,
	damp: 0.08,
	debug: true,
	detectFaces: false,
	captureVideo: false,
	followMouse: false,
	flip: true,
	interval: 1,
	timerInterval: 5, // Seconds
	detection: {
		w: 640,
		h: 380
	},
	input: {
		w: 640,
		h: 380
	}
}

const app = new Vue({
	beforeCreate() {
		console.log('Init Adocchio App')
		this.$store.commit('initVueApp', defaultConfig)
	},
	render: h => h(App),
	store
}).$mount('#app')
