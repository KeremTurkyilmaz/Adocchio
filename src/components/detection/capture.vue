<template>
	<div class="capture" :class="{ debug: config.debug }">
		<video ref="input" autoplay muted playsinline></video>
		<div class="controls">
			<p :class="{ paused: pausedVideo }" @click="toggleCamera">
				{{ pausedVideo ? 'Start Camera' : 'Stop Camera' }}
			</p>
			<p :class="{ paused: pausedDetection }" @click="toggleDetection">
				{{ pausedDetection ? 'Start Detection' : 'Stop Detection' }}
			</p>
		</div>
		<canvas ref="canvas"></canvas>
	</div>
</template>

<script>
import Camera from './camera'
export default {
	name: 'Capture',
	data() {
		return {
			pausedVideo: false,
			pausedDetection: false
		}
	},
	computed: {
		config() {
			return this.$store.getters.config
		}
	},
	mounted() {
		this.canvas = this.$refs.canvas
		this.input = this.$refs.input

		// Config
		this.pausedDetection = !this.config.detectFaces // Boolean

		// Init Camera
		this.camera = new Camera({
			canvas: this.canvas,
			flip: this.config.flip,
			captureVideo: this.config.captureVideo,
			timerInterval: this.config.timerInterval,
			detectFaces: this.config.detectFaces,
			detection: this.config.detection,
			input: {
				el: this.input,
				...this.config.input
			}
		})
	},
	methods: {
		toggleCamera() {
			this.pausedVideo = !this.pausedVideo
			this.pausedVideo ? this.camera.stopCapture() : this.camera.startCapture()
		},
		toggleDetection() {
			this.pausedDetection = !this.pausedDetection
			this.pausedDetection ? this.camera.stopDetection() : this.camera.startDetection()
		}
	}
}
</script>

<style lang="scss" scoped>
.capture {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	opacity: 0;
	&.debug {
		opacity: 0.5;
	}
	.controls {
		display: flex;
		flex-direction: row;
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
