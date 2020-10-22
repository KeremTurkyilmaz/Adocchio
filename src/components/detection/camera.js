import { resize, resizeCSS, map } from '@/utils'
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

		this.interval = options.interval

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

		// Check if capture is enabled
		this.captureVideo = options.captureVideo

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

		this.frames = 0

		// Resize canvas as input dimension
		resize(this.canvas, this.detection.w, this.detection.h)
		resize(this.input, this.detection.w, this.detection.h)

		// Scale the element CSS without changing the element dimension
		resizeCSS(this.canvas, 1)
		resizeCSS(this.input, 0)

		// If deteciton is enabled, we initialize the FaceDetection class
		if (this.detectFaces) {
			this.initFaceDetection()
		}

		// Check if capture is enabled, if it is, true get the user media
		if (this.captureVideo) {
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
	}

	// If deteciton is enabled, we initialize the FaceDetection class
	initFaceDetection() {
		console.log('Initialize FaceDetection')
		this.faceDetection = new FaceDetection({
			input: this.input
		})
	}

	getStream(stream) {
		// Stream return the MediaStream from camera device
		this.stream = stream

		// We pass the mediastream to the input element
		this.input.srcObject = stream

		// If caputre video is enabled, call update method
		if (this.captureVideo) this.update()
	}

	update() {
		if (this.captureVideo) {
			this.ctx.save()

			// Flip the cancas if we want the right mirrow effect
			if (this.flip) {
				this.ctx.scale(-1, 1)
				this.ctx.translate(-this.canvas.width, 0)
			}

			// Draw the input image into the canvas
			this.ctx.drawImage(this.input, 0, 0, this.canvas.width, this.canvas.height)

			// If detection is enabled we execute the faceDetection
			if (this.detectFaces) {
				// Launch faceDetector.setOnFaceUpdatedCallback
				this.faceDetection.detect()
				this.faces = []
				// For each face, draw its box
				this.faceDetection.faces.forEach((face, index) => {
					this.faces[index] = face
					this.drawFace(face)
				})

				if (this.faces.length) {
					if (this.frames % this.interval == 0) {
						const face = this.faces[0]
						let cx = face.x + face.w / 2
						let cy = face.y + face.y / 2
						cx = map(cx, this.canvas.width, 0 , 0, window.innerWidth)
						cy = map(cy, 0, this.canvas.height, 0, window.innerHeight)
						this.emit('detected', {
							x: cx,
							y: cy
						})
					}
				}
			}

			// Increment Frame
			this.frames++

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
		// If the variable didn't exit, initialize the faceDection class
		if (!this.faceDetection) {
			this.initFaceDetection()
			if (this.faceDetection.ready) this.detectFaces = true
		}
	}
}
