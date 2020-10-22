<template>
  <div class="capture row">
    <div class="column">
      <div class="controls">
        <p v-show="pausedVideo" :class="{ paused: pausedVideo }" @click.prevent="toggleCamera(true)">
          Start Camera
        </p>
        <p v-show="!pausedVideo" :class="{ paused: !pausedVideo }" @click.prevent="toggleCamera(false)">
          Stop Camera
        </p>
        <p v-show="pausedDetection" :class="{ paused: pausedDetection }" @click.prevent="toggleDetection(true)">
          Start Detection
        </p>
        <p v-show="!pausedDetection" :class="{ paused: !pausedDetection }" @click.prevent="toggleDetection(false)">
          Stop Detection
        </p>
        <p @click.prevent="pageReload">Reload</p>
      </div>
    </div>
    <div class="column">
      <video ref="input" autoplay muted class="input"></video>
      <canvas ref="canvas" class="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import Events from '@/plugins/events'
import Camera from './camera.js'

export default {
	name: 'Capture',
	data() {
		return {
			camera: null,
			pausedVideo: false,
			pausedDetection: null
		}
	},
	mounted() {
		this.camera = new Camera({
			...this.$config,
			detectFaces: this.$config.detectFaces, // Boolean
			captureVideo: this.$config.captureVideo,
			flip: this.$config.flip, // Boolean
			detection: this.$config.detection, // Detection Dimension (w, h)
			canvas: this.$refs.canvas, // Canvas Element
			interval: this.$config.interval,
			input: {
				el: this.$refs.input, // Input Element
				...this.$config.input // Input Width, Input Height
			}
		})
		this.captureVideo = this.$config.captureVideo
		this.pausedDetection = !this.$config.detectFaces // Boolean
  },
  destroyed() {
    this.camera = null
  },
  methods: {
    toggleCamera() {
      this.pausedVideo = !this.pausedVideo
      if (this.pausedVideo) {
        this.camera.stopCapture()
      } else {
        this.camera.startCapture()
      }
    },
    toggleDetection() {
      this.pausedDetection = !this.pausedDetection
      if (this.pausedDetection) {
        this.camera.stopDetection()
      } else {
        this.camera.startDetection()
      }
    },
    pageReload() {
      location.reload()
    }
  }
}
</script>

<style lang="scss">
.capture {
	position: relative;
	width: 100%;
	overflow: hidden;
	background-color: lightgray;
	padding: 0.2rem;
}

.row {
	.column:last-child {
		align-items: flex-end;
	}
}

.controls {
	padding: $padding;
	letter-spacing: -1px;
	display: flex;
	flex-direction: column;
	z-index: 10;
	p {
		display: inline-block;
		font-size: 3rem;
		line-height: 100%;
		margin-right: 1rem;
		color: white;
		cursor: pointer;
		&.paused {
			color: gray;
			&:hover {
				color: black;
			}
		}
	}
}
</style>
