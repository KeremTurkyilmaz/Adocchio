<template>
  <div class="controls">
    <p @click="toggleDebug">Enable Debug</p>
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
		}
	}
}
</script>

<style lang="scss" scoped>
.controls {
	position: fixed;
	top: 0;
	left: 0;
	padding: $padding;
}
</style>
