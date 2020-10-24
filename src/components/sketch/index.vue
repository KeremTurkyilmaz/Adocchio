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

    this.controller = new Controller({
      animate: true,
      canvas: this.canvas
    })

    // Init the controller
    this.controller.init()
    this.controller.draw()

    this.canvas.addEventListener('mousemove', (e) => {
      const mouse = {
        x: e.clientX,
        y: e.clientY
      }
      this.controller.scene.updateCoordinates = mouse
    })

    // Events.$on('detected', (data) => {
    //   this.controller.scene.updateCoordinates = {
    //     x: data.x,
    //     y: data.y
    //   }
    //   if (this.controller.scene.mode === 'sketch') return
    //   this.controller.scene.setMode = 'sketch'
    // })

    // Events.$on('lost-detection', (d) => {
    //   if (this.controller.scene.mode === 'idle') return
    //   this.controller.scene.setMode = 'idle'
    // })
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
