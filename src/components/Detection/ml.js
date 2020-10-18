import { EventEmitter } from 'events'
import { setupWorkerListeners, setupWorkerEmitters } from '@/utils'
import * as Worker from './ml-service.worker.js'

export default class ML extends EventEmitter {
	constructor(options) {
		super()
		// this.worker = new Worker();
		// this.target = options.target
		// this._faces = [];
		// setupWorkerListeners(this.worker)
		// setupWorkerEmitters(this.worker)
		// this.worker.on('ready', () => {
		//   this.modelLoaded()
		// })
		// this.worker.on('init', () => {
		//   this.modelLoaded()
		// })
		// this.worker.on('results', (results) => {
		//   this._faces = results
		// })
		// this.worker.onerror = (m) => {
		//   console.error(m)
		// }
	}

	modelLoaded() {
		this.ready = true
		this.emit('ready')
	}

	detect() {
		const ctx = this.target.getContext('2d')
		const data = ctx.getImageData(0, 0, this.target.width, this.target.height)
		this.worker.send('data', { data, width: this.target.width, height: this.target.height })
	}

	get faces() {
		return this._faces
	}
}
