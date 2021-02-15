<template>
  <div class="sketch">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import Events from '@/plugins/events'
import Controller from './controller/controller'

export default {
	name: 'Sketch',
	computed: {
		config() {
			return this.$store.getters.config
		}
	},
	async mounted() {
		// Canvas reference
		this.canvas = this.$refs.canvas

		// Create new controller
		this.controller = new Controller({
			...this.config,
			animate: true,
			canvas: this.canvas
		})

		// Init the controller
		await this.controller.init()

		// Listen for mouse move
		if (this.config.followMouse) {
			this.canvas.addEventListener('mousemove', e => {
				this.controller.scene.updateCoordinates = {
					x: e.clientX,
					y: e.clientY
				}
			})
		}

		// Listen for detected faces -> Emitted by camera.js
		Events.$on('detected', data => {
			this.controller.scene.updateCoordinates = {
				x: data.x,
				y: data.y
			}
			if (this.controller.scene.mode === 'detection') return
			this.controller.scene.setMode = 'detection'
		})

		// Listen for detected faces -> Emitted by camera.js
		Events.$on('lost-detection', () => {
			if (this.controller.scene.mode === 'idle') return
			this.controller.scene.setMode = 'idle'
		})

		// Add resize event, fit canvas to the current window size
		window.addEventListener('resize', () => {
			this.controller.init()
			this.controller.draw()
		})
	}
}
</script>

<style lang="scss" scoped>
.sketch {
	width: 100%;
	height: 100%;
	overflow: hidden;
	canvas {
		width: 100%;
		height: 100%;
	}
}
</style>
