import { calculateGrid } from '@/utils'

import Scene from './scene'
import Eye from '../objects/eye'

export default class S_Grid extends Scene {
	constructor(options = {}) {
		super()
		this.ctx = options.ctx
		this.bounds = options.bounds
	}

	init() {
		// Define eye radius
		this.modulo = 200

		// Calculate a perfect grid based on modulo size and the container bounds
		this.grid = calculateGrid({
			modulo: this.modulo,
			bounds: this.bounds
		})

		// Loop trought rows and columns
		for (let j = 0; j < this.grid.rows; j++) {
			for (let i = 0; i < this.grid.cols; i++) {
				// Add eye to the eyes list
				this.eyes.push(
					// Create new eye
					new Eye({
						origin: {
							x: i * this.modulo + this.grid.pad.x * (i + 1),
							y: j * this.modulo + this.grid.pad.y * (j + 1)
						},
						radius: this.modulo
					})
				)
			}
		}
	}
}
