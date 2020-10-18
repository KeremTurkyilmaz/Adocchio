import { resize, lerp, max, distance, random, resizeCSS } from '@/utils'
import { EventEmitter } from 'events'
// import ML from './ml'

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

		// Array of faces
		this.faces = []

		// Launch Setup and log all options
		console.log('Initializing camera', options)
		this.setup()
	}

	setup() {
		// Get canvas context
		this.ctx = this.canvas.getContext('2d')

		// Resize canvas as input dimension
		resize(this.canvas, this.inputW, this.inputH)

		// Scale CSS without changing the canvas element
		resizeCSS(this.canvas, 0.4)
		resizeCSS(this.input, 0)

		if(this.detectFaces){
			console.log("Detect Faces is enable")
		}

		// if (this.detectFaces) {
		// 	console.log('Initializing buffer')
		// 	this.buffer = document.createElement('canvas')
		// 	this.buffer.id = 'buffer'
		// 	this.canvas.parentNode.insertBefore(this.buffer, this.canvas.nextSibling)
		// 	resize(this.buffer, this.dw, this.dh)
		// 	this.bufferCtx = this.buffer.getContext('2d')
		// 	this.ML = new ML({ target: this.buffer })
		// }

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
		if (this.detectFaces) this.update()
		// if (this.ML.ready) this.update()
		// else {
		// 	this.ML.on('ready', () => {
		// 		console.log('face detection ready')
		// 		this.update()
		// 	})
		// }
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

			this.ctx.restore()

			// if (this.detectFaces) {
			// 	this.drawBuffer()
			// 	this.ML.detect(this.buffer)
			// 	this.faces = []
			// 	this.ML.faces.forEach((f, i) => {
			// 		const t = this.getOutputCoords(f)
			// 		this.faces[i] = t
			// 		if (this.options.drawDetection) this.drawDetection(t)
			// 	})
			// 	if (this.options.centerFaces && this.faces.length) {
			// 		const face = max(this.faces, f => f.area)
			// 		this.offsetY = lerp(this.offsetY, this.oc.y - face.y, 0.1)
			// 	}
			// 	if (this.ML.faces.length) this.emit('detected', this.ML.faces)
			// }
			requestAnimationFrame(() => this.update())
		}
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
