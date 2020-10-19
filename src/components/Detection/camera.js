import { resize, resizeCSS } from '@/utils'
import { EventEmitter } from 'events'
import FaceDetection from './detection.js'

export default class CameraTools extends EventEmitter {
	constructor(options = {}) {
		// Call super to access the EventEmitter functions
		super()

		// Reference to options props
		this.options = options

		// Reference to canvas
		this.canvas = options.canvas

		// Input element, width and height
		this.input = options.input.el
		this.inputW = options.input.w
		this.inputH = options.input.h

		// Input Center
		this.center = {
			x: this.inputW / 2,
			y: this.inputH / 2
		}

		// Flip camera option
		this.flip = options.flip

		// Check if we need to detect faces
		this.detectFaces = options.detectFaces
		this.detection = options.detection
		this.paused = false

		// Launch Setup and log all options
		console.log('Initializing camera', options)
		this.setup()
	}

	setup() {
		// Get canvas context
		this.ctx = this.canvas.getContext('2d')

		// Resize canvas as input dimension
		resize(this.canvas, this.detection.w, this.detection.h)
		resize(this.input, this.detection.w, this.detection.h)

		// Scale the element CSS without changing the element dimension
		resizeCSS(this.canvas, 1)
		resizeCSS(this.input, 0)

		if (this.detectFaces) {
			console.log('Detection is enable')
			this.faceDetection = new FaceDetection({
				input: this.input
			})
		} else {
			console.log("Detection isn't enable")
		}
		navigator.mediaDevices
			.getUserMedia({
				video: {
					width: this.inputW,
					height: this.inputH
				}
			})
			.then(stream => {
				this.getStream(stream)
			})
	}

	getStream(stream) {
		// Stream return the MediaStream from camera device
		this.stream = stream

		// We pass the mediastream to the input element
		this.input.srcObject = stream
		if (this.detectFaces) {
			if (this.faceDetection.ready) this.update()
			else {
				this.faceDetection.on('ready', () => {
					this.update()
				})
			}
		}
	}

	update() {
		if (!this.paused) {
			this.ctx.save()

			// Flip the cancas if we want the right mirrow effect
			if (this.flip) {
				this.ctx.scale(-1, 1)
				this.ctx.translate(-this.canvas.width, 0)
			}

			// Draw the input image into the canvas
			this.ctx.drawImage(this.input, 0, 0, this.canvas.width, this.canvas.height)

			// If detection is enable we execute the faceDetection
			if (this.detectFaces) {
				// Launch faceDetector.setOnFaceUpdatedCallback
				this.faceDetection.detect()
				this.faces = []
				// For each face, draw its box
				this.faceDetection.faces.forEach(face => {
					this.drawFace(face)
				})
			}

			this.ctx.restore()

			requestAnimationFrame(() => this.update())
		}
	}

	// Draw face bounds into ctx
	drawFace(face) {
		this.ctx.save()
		this.ctx.lineWidth = '2'
		this.ctx.strokeStyle = '#ffc400'
		this.ctx.beginPath()
		this.ctx.rect(face.x, face.y, face.w, face.h)
		this.ctx.stroke()
		this.ctx.restore()
	}

	stop() {
		// Stop Detection
		this.paused = true
	}

	start() {
		// Start Detection
		this.paused = false
		this.update()
	}
}
