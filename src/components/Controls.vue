<template>
  <div v-if="edit" class="controls" :class="{ show }">
    <div class="middle">
      <div class="input-row special">
        <p>Debug Mode:</p>
        <input v-model.number="edit.debug" type="checkbox" />
      </div>
      <div class="input-row">
        <p>Modulo: {{ edit.modulo }}</p>
        <input v-model.number="edit.modulo" type="range" min="50" max="400" step="10" />
      </div>
      <div class="input-row">
        <p>Scale: {{ edit.scale }}</p>
        <input v-model.number="edit.scale" type="range" min="0" max="1" step="0.05" />
      </div>
      <div class="input-row">
        <p>Damp: {{ edit.damp }}</p>
        <input v-model.number="edit.damp" type="range" min="0.01" max="0.1" step="0.005" />
      </div>
      <div class="input-row">
        <p>TimerInterval: {{ edit.timerInterval }} seconds</p>
        <input v-model.number="edit.timerInterval" type="range" min="1" max="10" step="1" />
      </div>
    </div>
    <div class="bottom">
      <button @click="deleteSettings">Delete Settings</button>
      <button @click="saveSettings">Save Settings</button>
    </div>
  </div>
</template>

<script>
import { clone } from '@/utils'

export default {
	name: 'Controls',
	props: {
		controller: {
			type: Object,
			required: true
		},
		capture: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			show: false,
			edit: null
		}
	},
	computed: {
		config() {
			return this.$store.getters.config
		}
	},
	mounted() {
		this.edit = clone(this.config)
		window.addEventListener('keypress', e => {
			if (e.key == 'd') this.show = !this.show
		})
	},
	methods: {
		deleteSettings() {
			this.$store.commit('deleteLocalConfig')
		},
		saveSettings() {
			this.$store.commit('updateConfig', this.edit)
			window.location.reload()
		}
	}
}
</script>

<style lang="scss" scoped>
.controls {
	position: fixed;
	top: 0;
	left: 0;
	padding: $padding * 6;
	width: 20rem;
	background-color: black;
	color: white;
	opacity: 0;
	z-index: 1000;
	&.show {
		display: block;
		opacity: 1;
	}
	.input-row {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 4rem;
		padding: $padding;
		&.special {
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
		}
	}
	.bottom {
		display: flex;
		align-items: center;
		flex-direction: row;
		height: 4rem;
		justify-content: space-between;
	}
	button {
		width: 48%;
		height: 2rem;
		background-color: transparent;
		outline: 1px solid white;
		color: white;
		&:hover {
			background-color: white;
			color: black;
		}
	}
}
</style>
