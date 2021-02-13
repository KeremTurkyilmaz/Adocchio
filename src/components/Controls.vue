<template>
  <div class="controls">
    <div class="header">
      <p>Controls</p>
    </div>
    <p @click="toggleDebug">Enable Debug</p>
    <button @click="deleteLocalStorage">Clear Settings</button>
  </div>
</template>

<script>
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
	methods: {
		toggleDebug() {
			this.capture.debug = !this.capture.debug
			this.controller.updateOptions = {
				key: 'debug',
				value: !this.controller.options.debug
			}
		},
		deleteLocalStorage() {
			this.$store.commit('deleteLocalConfig')
		}
	}
}
</script>

<style lang="scss" scoped>
.controls {
	position: fixed;
	top: 0;
	left: 0;
	padding: $padding * 2;
	width: 20rem;
	background-color: lightgray;
	text-align: center;
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 5rem;
	}
}
</style>
