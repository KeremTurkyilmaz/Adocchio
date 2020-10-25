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
		this.modulo = 400

		// Calculate a perfect grid based on modulo size and the container bounds
		this.grid = calculateGrid({
			modulo: this.modulo,
			bounds: this.bounds
		})

		for (let i = 0; i < this.grid.cells; i++) {
			const eye = new Eye({
				ctx: this.ctx,
				origin: {
					x: this.grid.origins[i].x,
					y: this.grid.origins[i].y
				},
				radius: this.modulo
			})
			this.eyes.push(eye)
		}
	}
}
