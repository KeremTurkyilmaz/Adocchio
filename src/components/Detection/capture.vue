<template>
  <div class="capture">
    <video autoplay muted class="input overlay" ref="input"></video>
    <canvas class="swap overlay" ref="swap"></canvas>
    <video autoplay muted class="output overlay" ref="output"></video>
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
      paused: false,
      bus: new Vue()
    }
  },
  mounted() {
    // this.camera = new Camera({
    //   ...this.$config,
    //   detection: this.$config.detection,
    //   centerFaces: this.$config.centerFaces,
    //   input: {
    //     el: this.$refs.input,
    //     ...this.$config.input
    //   },
    //   swap: {
    //     el: this.$refs.swap,
    //     ...this.$config.swap
    //   },
    //   output: {
    //     el: this.$refs.output,
    //     ...this.$config.output
    //   },
    //   picture: this.$config.picture
    // })
    // this.camera.on('detected', (d) => {
    //   console.log(d)
    // })
  },
  methods: {},
  destroyed() {
    this.camera = null
  }
}
</script>

<style lang="scss">
.capture {
  overflow: hidden;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.input {
  transform: scale(0);
}
.output {
  display: none;
}
.swap {
  transform: scale(1);
}
.picture-preview {
  z-index: 110;
}
h3 {
  font-size: 4rem;
}
.preview-counter {
  position: absolute;
  bottom: 1rem;
  background-color: #e6002d;
  color: #ffffff;
  padding: 0.5rem;
  margin: 0 auto;
}

.target {
  position: absolute;
  z-index: 10;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  svg {
    height: 50%;
    width: 50%;
    fill: #e6002d;
  }
  &.active {
    svg {
      fill: #00ffff;
    }
  }
}
</style>
