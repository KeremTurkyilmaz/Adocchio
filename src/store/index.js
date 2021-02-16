import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultConfig = {
	scale: 0.8,
	min: 100, 
	max: 300,
	modulo: 150,
	damp: 0.09,
	debug: false,
	detectFaces: true,
	captureVideo: true,
	followMouse: false,
	flip: true,
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

const localSettings = window.localStorage.getItem('settings')
const settings = localSettings ? JSON.parse(localSettings) : defaultConfig

export const store = new Vuex.Store({
	state: {
		config: settings
	},
	getters: {
		config: state => state.config
	},
	mutations: {
		updateConfig(state, data) {
			state.config = data
			localStorage.setItem('settings', JSON.stringify(data))
		},
		deleteLocalConfig() {
			console.log('Clear Local Storage')
			localStorage.removeItem('settings')
		}
	}
})
