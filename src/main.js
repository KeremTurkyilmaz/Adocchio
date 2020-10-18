import Vue from 'vue'
import App from './App.vue'
import './assets/styles/main.scss'

Vue.config.productionTip = false

Vue.prototype.$config = {
	detectFaces: true,
	flip: true,
	detection: {
		w: 512,
		h: 288
	},
	input: {
		w: 1920,
		h: 1080
	}
}

new Vue({
	render: h => h(App)
}).$mount('#app')
