import Vue from 'vue'
import App from './App.vue'
import './assets/styles/main.scss'

Vue.config.productionTip = false

Vue.prototype.$config = {
	followMouse: false,
	detectFaces: false,
	captureVideo: true,
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

new Vue({
	render: h => h(App)
}).$mount('#app')
