import { calculateGrid, random } from '@/utils'

import Scene from './scene'
import Eye from '../objects/eye'

export default class S_Grid extends Scene {
	constructor(options = {}) {
		super()
		this.options = options
		this.ctx = options.ctx
		this.bounds = options.bounds
		this.damp = options.damp
		this.modulo = options.modulo
		this.assets = options.assets
		this.scale = options.scale
	}

	init(randomSize) {

		const dim = randomSize || this.modulo

		// Calculate a perfect grid based on modulo size and the container bounds
		this.grid = calculateGrid({
			modulo: dim,
			bounds: this.bounds
		})

		let id = 0;
		// Loop trought rows and columns
		for (let j = 0; j < this.grid.rows; j++) {
			for (let i = 0; i < this.grid.cols; i++) {
				// Associated mover
				const mover = random(0, this.movers.length - 1)

				const options = {
					scale: this.scale,
					mover: mover,
					ctx: this.ctx,
					radius: dim,
					assets: this.assets,
					origin: {
						x: i * dim + this.grid.pad.x * (i + 1),
						y: j * dim + this.grid.pad.y * (j + 1)
					}
				}

				setTimeout(() => {
					this.eyes.push(
						// Create new eye
						new Eye(options)
					)
				}, id*50)
				id++
				// Add eye to the eyes list
			}
		}
	}
}
