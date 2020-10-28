import Events from '@/plugins/events'
import Pico from '@/plugins/vendor/pico.js'
import { rgba_to_grayscale } from '@/utils'

const modelURL = 'https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder'

const defaultParams = {
	detection: {
		shiftfactor: 0.1, // move the detection window by 10% of its size
		minsize: 100, // minimum size of a face
		maxsize: 1000, // maximum size of a face
		scalefactor: 1.1 // for multiscale processing: resize the detection window by 10% when moving to the higher scale
	},
	// It's work better with small values
	memory: 10 // we will use the detecions of the last n frames
}

export default class Detection {
	constructor(options = {}) {
		this._faces = []
		this.params = { ...defaultParams, ...options.params }
		this.canvas = options.canvas
	}

	loadModel() {
		fetch(modelURL).then(res => {
			res.arrayBuffer().then(buffer => {
				console.log('Model loaded')
				this.ready = true
				this.bytes = new Int8Array(buffer)
				this.setup()
			})
		})
	}

	setup() {
		console.log('Detection Setup')
		this.Pico = new Pico()
		this.memory = this.Pico.instantiate_detection_memory(this.params.memory)
		this.model = this.Pico.unpack_cascade(this.bytes)
		Events.$emit('ready', true)
	}

	detect() {
		try {
			// Pico.js

			// Get context
			const ctx = this.canvas.getContext('2d')

			// Copy the pixel data
			const rgba = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data

			// Image Params
			const image = {
				pixels: rgba_to_grayscale(rgba, this.canvas.height, this.canvas.width),
				nrows: this.canvas.height,
				ncols: this.canvas.width,
				ldim: this.canvas.width
			}

			// Detection
			let dets = this.Pico.run_cascade(image, this.model, this.params.detection)

			// Detection
			dets = this.memory(dets)
			dets = this.Pico.cluster_detections(dets, 0.2)

			if (dets.length) {
				const face = dets[0]
				if (face[3] > 50.0) {
					let results = []
					// Push into results array a normalized face object
					results = dets.map(face => {
						return this.normalizeFace(face)
					})
					// Update faces array
					this._faces = results
				}
			} else {
				// When detection is lost, set faces list as an empty array
				this._faces = []
			}
		} catch (e) {
			console.error('Face detection failed:', e)
		}
	}

	normalizeFace(face) {
		const x = face[1] - face[2] / 2
		const y = face[0] - face[2] / 2
		const w = face[2]
		return {
			x,
			y,
			w,
			center: {
				x: face[1],
				y: face[0]
			}
		}
	}

	// Getter, return faces array
	get faces() {
		return this._faces
	}
}
