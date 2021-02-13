import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		config: null
	},
	getters: {
		config: state => {
			return state.config
		}
	},
	mutations: {
		initVueApp(state, data) {
			const localSettings = window.localStorage.getItem('settings')
			state.config = localSettings ? JSON.parse(localSettings) : data
		},
		saveConfig(state, data) {
			state.config = data
			localStorage.setItem('settings', JSON.stringify(data))
		},
		deleteLocalConfig() {
			console.log('Clear Local Storage')
			localStorage.removeItem('settings')
		}
	}
})
