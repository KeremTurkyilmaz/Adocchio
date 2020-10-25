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
		this.modulo = 100

		// Calculate a perfect grid based on modulo size and the container bounds
		this.grid = calculateGrid({
			modulo: this.modulo,
			bounds: this.bounds
		})

		for (let i = 0; i < this.grid.rows; i++) {
			for (let j = 0; j < this.grid.cols; j++) {
				const eye = new Eye({
					ctx: this.ctx,
					origin: {
						x: i * this.modulo + this.grid.pad.x * (i + 1),
						y: j * this.modulo + this.grid.pad.y * (j + 1)
					},
					radius: this.modulo
				})
				this.eyes.push(eye)
			}
		}
	}
}
