<template>
  <div class="sketch">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import Controller from './Controller'
export default {
  name: 'Sketch',
  mounted() {
    this.controller = new Controller({
      animate: true,
      canvas: this.$refs.canvas
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
