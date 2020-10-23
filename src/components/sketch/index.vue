<template>
  <div class="sketch">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import Events from '@/plugins/events'
import Controller from './controller'
import { move } from '@/utils'

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

    Events.$on('detected', (data) => {
      this.controller.scene.updateCoordinates = {
        x: data.x,
        y: data.y
      }
      if (this.controller.scene.mode === 'sketch') return
      this.controller.scene.setMode = 'sketch'
    })

    Events.$on('lost-detection', (d) => {
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
