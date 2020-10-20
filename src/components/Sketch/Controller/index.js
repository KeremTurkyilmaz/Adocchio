export default class Controller {
	constructor(options = {}) {
		console.log('Initialize Controller', options)
		this.options = options
		this.canvas = options.canvas
		this.animate = options.animate
	init() {
		// Retrive container bounds
		this.bounds = this.calculateBounds()
	}
	calculateBounds() {
		const container = this.canvas.parentNode
		const containerSize = container.getBoundingClientRect()
		return {
			x: containerSize.x,
			y: containerSize.y,
			w: containerSize.width,
			h: containerSize.height,
			center: {
				x: containerSize.width / 2,
				y: containerSize.height / 2
			}
		}
	}

	stop() {
		this.animate = false
		this.ctx.clearRect(0, 0, this.bounds.w, this.bounds.h)
	}

	start() {
		this.animate = true
		this.draw()
	}
}
