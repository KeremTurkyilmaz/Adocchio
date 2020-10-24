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
    // Canvas reference
    this.canvas = this.$refs.canvas

    // Create new controller
    this.controller = new Controller({
      animate: true,
      canvas: this.canvas
    })

    // Init the controller
    this.controller.init()

    // Start drawing
    this.controller.draw()

    // Listen for mouse move
    if (this.$config.followMouse) {
      this.canvas.addEventListener('mousemove', (e) => {
        const mouse = {
          x: e.clientX,
          y: e.clientY
        }
        this.controller.scene.updateCoordinates = mouse
      })
    }

    // Listen for detected faces -> Emitted by camera.js
    Events.$on('detected', (data) => {
      this.controller.scene.updateCoordinates = {
        x: data.x,
        y: data.y
      }
      if (this.controller.scene.mode === 'sketch') return
      this.controller.scene.setMode = 'sketch'
    })

    // Listen for detected faces -> Emitted by camera.js
    Events.$on('lost-detection', () => {
      if (this.controller.scene.mode === 'idle') return
      this.controller.scene.setMode = 'idle'
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
