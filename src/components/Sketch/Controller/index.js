export default class Controller {
	constructor(options = {}) {
		console.log('Initialize Controller', options)
		this.options = options
		this.canvas = options.canvas
		this.animate = options.animate
	init() {
		// Retrive container bounds
		this.bounds = this.calculateBounds()
		// Set canvas dimension
		this.canvas.setAttribute('width', this.bounds.w)
		this.canvas.setAttribute('height', this.bounds.h)
		this.canvas.style.width = this.bounds.w + 'px'
		this.canvas.style.height = this.bounds.h + 'px'
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
