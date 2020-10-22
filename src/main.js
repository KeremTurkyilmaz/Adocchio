import Vue from 'vue'
import App from './App.vue'
import './assets/styles/main.scss'

Vue.config.productionTip = false

Vue.prototype.$config = {
	detectFaces: false,
	captureVideo: true,
	flip: true,
	interval: 1,
	detection: {
		w: 384,
		h: 216
	},
	input: {
		w: 1920,
		h: 1080
	}
}

new Vue({
	render: h => h(App)
}).$mount('#app')
