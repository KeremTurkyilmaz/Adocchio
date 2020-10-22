import { EventEmitter } from 'events'
const FaceDetector = require('facedetector')

export default class FaceDetection extends EventEmitter {
	constructor(options = {}) {
		super()
		this.input = options.input
		this._faces = []
		this.setup()
	}

	setup() {
		if (this.input) {
			// If input is valid
			// We initialize the faceDetector library
			// We pass the input video as a parameter
			this.faceDetector = new FaceDetector({
				video: this.input
			})

			// Start the detection
			this.faceDetector.startDetecting()

			// The model is loaded and ready
			// We notify the controller with an emit
			this.modelLoaded()
		} else {
			console.log('Can\'t read input stream')
		}
	}

	modelLoaded() {
		this.ready = true
	}

	detect() {
		try {
			// This is a function from the faceDetector library
			// it calls a requestAnimationFrame method
			this.faceDetector.setOnFaceUpdatedCallback(faces => {
				let results = []
				if (faces && faces.length) {
					// Push into results array a normalized face object
					results = faces.map(face => {
						return this.normalizeFace(face)
					})
				}
				// Update faces array
				this._faces = results
			})
			this.faceDetector.setOnFaceLostCallback(() => {
				this._faces = []
			})
		} catch (e) {
			// Log an error if the detection fails
			console.error('Face detection failed:', e)
		}
	}

	// Normalize face coordinates
	// We scale the face coordinates according
	// to the size of the input
	normalizeFace(face) {
		const x = face.x * this.input.width
		const y = face.y * this.input.height
		const w = face.width * this.input.width
		const h = face.height * this.input.height
		return {
			x,
			y,
			w,
			h,
			center: {
				x: x + w / 2,
				y: y + h / 2
			}
		}
	}

	// Getter, return faces array
	get faces() {
		return this._faces
	}
}
