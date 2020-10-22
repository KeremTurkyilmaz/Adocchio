<template>
  <div class="sketch">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import Events from '@/plugins/events'
import Controller from './controller'
export default {
	name: 'Sketch',
	mounted() {
		this.controller = new Controller({
			animate: true,
			canvas: this.$refs.canvas
		})

		// Init the controller
		this.controller.init()
		this.controller.draw()

		Events.$on('detected', data => {
			this.controller.updateCoordinates = {
				x: data.x,
				y: data.y
			}
		})

		Events.$on('lost-detection', d => {
			console.log('Lost Detection')
			// this.controller.updateCoordinates = {
			// 	x: coordinates.x,
			// 	y: coordinates.y
			// }
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
