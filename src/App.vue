<template>
  <div id="app">
    <Controls v-if="showControls && controller && capture" :controller="controller" :capture="capture" />
    <Sketch ref="sketch" />
    <Capture ref="capture" />
  </div>
</template>

<script>
import Controls from '@/components/Controls.vue'
import Capture from '@/components/detection/capture.vue'
import Sketch from '@/components/sketch/'
export default {
	name: 'App',
	components: {
		Controls,
		Capture,
		Sketch
	},
	data() {
		return {
			showControls: false,
			controller: null,
			capture: null
		}
	},
	mounted() {
		this.controller = this.$refs.sketch.controller
		this.capture = this.$refs.capture
		window.addEventListener('keypress', this.handleKeyPress)
	},
	destroyed() {
		window.removeEventListener('keypress', this.handleKeyPress)
	},
	methods: {
		handleKeyPress(e) {
			if (e.key == 'd') this.showControls = !this.showControls
		}
	}
}
</script>

<style lang="scss" scoped></style>
