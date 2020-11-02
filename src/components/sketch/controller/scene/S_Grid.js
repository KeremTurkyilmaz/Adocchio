import { calculateGrid, random } from '@/utils'

import Scene from './scene'
import Eye from '../objects/eye'

export default class S_Grid extends Scene {
	constructor(options = {}) {
		super()
		this.ctx = options.ctx
		this.bounds = options.bounds
		this.debug = options.debug
		this.damp = options.damp
	}

	init() {
		// Define eye radius
		this.modulo = 150

		// Calculate a perfect grid based on modulo size and the container bounds
		this.grid = calculateGrid({
			modulo: this.modulo,
			bounds: this.bounds
		})

		// Loop trought rows and columns
		for (let j = 0; j < this.grid.rows; j++) {
			for (let i = 0; i < this.grid.cols; i++) {
				// Associated mover
				const moverId = random(0, this.movers.length - 1)

				// Add eye to the eyes list
				this.eyes.push(
					// Create new eye
					new Eye({
						moverId,
						ctx: this.ctx,
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
