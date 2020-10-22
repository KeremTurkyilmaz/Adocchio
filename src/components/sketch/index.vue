<template>
  <div class="sketch">
    <canvas ref="canvas" />
  </div>
</template>

<script>
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

    this.$refs.canvas.addEventListener('mousemove', (e) => {
      this.controller.updateCoordinates = {
        x: e.clientX,
        y: e.clientY
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.sketch {
  width: 100%;
  height: 75%;
  overflow: hidden;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
