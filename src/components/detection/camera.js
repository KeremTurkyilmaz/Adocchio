import Events from '@/plugins/events'
import Detection from './detection'
import { secondsToFrames, map, resize, resizeCSS } from '@/utils'

export default class Camera {
	constructor(options = {}) {
		this.options = options
		this.canvas = options.canvas
		this.flip = options.flip
		this.detectFaces = options.detectFaces
		this.captureVideo = options.captureVideo
		this.timerInterval = secondsToFrames(options.timerInterval)
		this.timer = 0
		this.detection = options.detection
		this.input = {
			el: options.input.el,
			w: options.input.w,
			h: options.input.h
		}
		this.center = {
			x: this.input.w / 2,
			y: this.input.h / 2
		}
		this.setup()
		this.frameCount = 0
	}

	setup() {
		this.ctx = this.canvas.getContext('2d')

		// Resize elements
		resize(this.canvas, this.detection.w, this.detection.h)
		const scl = 0.8
		resizeCSS(this.canvas, this.detection.w * scl, this.detection.h * scl)
		resizeCSS(this.input.el, 0, 0)

		// Get user media
		navigator.mediaDevices
			.getUserMedia({
				video: {
					width: this.input.w,
					height: this.input.h
				}
			})
			.then(stream => {
				this.input.el.srcObject = stream
				// If caputre video is enabled, call update method
				if (this.captureVideo) this.update()
				if (this.detectFaces) this.initDetection()
			})
	}

	initDetection() {
		this.faceDetection = new Detection({
			canvas: this.canvas
		})
		this.faceDetection.loadModel()
		Events.$on('ready', () => {
			this.update()
		})
	}

	update() {
		if (this.captureVideo) {
			this.ctx.save()

			// Mirror effect
			if (this.flip) {
				this.ctx.scale(-1, 1)
				this.ctx.translate(-this.canvas.width, 0)
			}

			// Draw input image into the canvas
			this.ctx.drawImage(this.input.el, 0, 0, this.canvas.width, this.canvas.height)

			this.ctx.restore()

			// Detect faces
			if (this.detectFaces && this.faceDetection) {
				// If the detection isn't ready return
				if (!this.faceDetection.ready) return

				// Run detection
				this.faceDetection.detect()

				// Empty faces list
				this.faces = []

				// For each face, draw its box
				this.faceDetection.faces.forEach((face, index) => {
					this.faces[index] = face
				})

				// Draw and Emit only if we have more than one face
				if (this.faces.length) {
					const face = this.faces[0]

					// Draw only the first face
					this.drawFace(face)

					// Map detection values with window size
					const pos = {
						x: map(face.center.x, 0, this.canvas.width, 0, window.innerWidth),
						y: map(face.center.y, 0, this.canvas.height, 0, window.innerHeight)
					}
					// Emit detectioj position
					Events.$emit('detected', pos)
				} else {
					// After m seconds we had lost the detection, set idle mode
					if (this.timer >= this.timerInterval) {
						Events.$emit('lost-detection', null)
						this.timer = 0
					} else {
						this.timer++
					}
				}
			}

			// Update frameCount
			this.frameCount++

			requestAnimationFrame(() => this.update())
		}
	}

	drawFace(face) {
		this.ctx.save()
		this.ctx.lineWidth = '2'
		this.ctx.strokeStyle = '#ffc400'
		this.ctx.beginPath()
		this.ctx.rect(face.x, face.y, face.w, face.w)
		this.ctx.stroke()
		this.ctx.fillStyle = '#ffc400'
		this.ctx.beginPath()
		this.ctx.ellipse(face.center.x, face.center.y, 10, 10, 0, 0, Math.PI * 2)
		this.ctx.fill()
		// Draw coordinates
		// this.ctx.font = '20px Helvetica'
		// this.ctx.fillText(Math.floor(face.center.x) + ' ' + Math.floor(face.center.y), face.x, face.y - 10)
		this.ctx.restore()
	}

	stopCapture() {
		// Stop Caputure
		this.captureVideo = false
	}

	startCapture() {
		this.captureVideo = true
		this.update()
	}

	stopDetection() {
		// Don't detect faces
		this.detectFaces = false
		// Clear the detection
		this.faceDetection = null
	}

	startDetection() {
		// If the variable didn't exit, initialize faceDection
		if (!this.faceDetection) {
			this.detectFaces = true
			this.initDetection()
		}
	}
}
