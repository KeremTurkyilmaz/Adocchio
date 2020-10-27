<template>
  <div class="capture">
    <video ref="input" autoplay muted playsinline></video>
    <div class="controls">
      <p
        v-show="pausedVideo"
        :class="{ paused: pausedVideo }"
        @click.prevent="toggleCamera(true)"
      >
        Start Camera
      </p>
      <p
        v-show="!pausedVideo"
        :class="{ paused: !pausedVideo }"
        @click.prevent="toggleCamera(false)"
      >
        Stop Camera
      </p>
      <p
        v-show="pausedDetection"
        :class="{ paused: pausedDetection }"
        @click.prevent="toggleDetection(true)"
      >
        Start Detection
      </p>
      <p
        v-show="!pausedDetection"
        :class="{ paused: !pausedDetection }"
        @click.prevent="toggleDetection(false)"
      >
        Stop Detection
      </p>
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Camera from './camera'
import Events from '@/plugins/events'
export default {
  name: 'Capture',
  data() {
    return {
      pausedVideo: false,
      pausedDetection: null,
      positions: []
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.input = this.$refs.input

    this.camera = new Camera({
      canvas: this.canvas,
      flip: this.$config.flip,
      captureVideo: this.$config.captureVideo,
      detectFaces: this.$config.detectFaces,
      detection: this.$config.detection,
      input: {
        el: this.input,
        ...this.$config.input
      }
    })
    this.captureVideo = this.$config.captureVideo
    this.pausedDetection = !this.$config.detectFaces // Boolean
  },
  methods: {
    toggleCamera() {
      this.pausedVideo = !this.pausedVideo
      if (this.pausedVideo) this.camera.stopCapture()
      else this.camera.startCapture()
    },
    toggleDetection() {
      this.pausedDetection = !this.pausedDetection
      if (this.pausedDetection) this.camera.stopDetection()
      else this.camera.startDetection()
    }
  }
}
</script>

<style lang="scss" scoped>
.capture {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .controls {
    display: flex;
    flex-direction: row;
    width: 50%;
    justify-content: center;
    align-items: center;
    background-color: $col-white;
    min-height: 3rem;
    p {
      font-weight: 900;
      color: $col-dark;
      margin: 0 1rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
  canvas {
    margin: 2rem 0;
  }
}
</style>
