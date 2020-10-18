<template>
  <div class="capture">
    <video autoplay muted class="input" ref="input"></video>
    <canvas class="canvas overlay" ref="canvas"></canvas>
    <div class="controls">
      <p @click.prevent="startCamera" :class="{ paused: paused }">Start</p>
      <p @click.prevent="stopCamera" :class="{ paused: !paused }">Stop</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Camera from './camera.js'

export default {
  name: 'Capture',
  data() {
    return {
      camera: null,
      paused: null
      // bus: new Vue()
    }
  },
  mounted() {
    this.camera = new Camera({
      ...this.$config,
      detectFaces: this.$config.detectFaces, // Boolean
      flip: this.$config.flip, // Boolean
      detection: this.$config.detection, // Detection Dimension (w, h)
      canvas: this.$refs.canvas, // Canvas Element
      input: {
        el: this.$refs.input, // Input Element
        ...this.$config.input // Input Width, Input Height
      }
    })

    this.paused = !this.$config.detectFaces // Boolean

    // this.camera.on('detected', (d) => {
    //   console.log(d)
    // })
  },
  methods: {
    startCamera() {
      this.paused = false
      this.camera.start()
    },
    stopCamera() {
      this.paused = true
      this.camera.stop()
    }
  },
  destroyed() {
    this.camera = null
  }
}
</script>

<style lang="scss">
.capture {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: lightgray;
}
.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
	transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}
.input {
  transform: scale(0);
}
.controls {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  z-index: 10;
  p {
    font-size: 4rem;
    margin-right: 1rem;
    color: white;
    cursor: pointer;
    &.paused {
      color: gray;
    }
  }
}
</style>
