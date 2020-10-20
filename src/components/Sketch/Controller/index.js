export default class Controller {
	constructor(options = {}) {
		console.log('Initialize Controller', options)
		this.options = options
		this.canvas = options.canvas
		this.animate = options.animate
	}

	init() {
		// Get canvas context
		this.ctx = this.canvas.getContext('2d')
		// Retrive container bounds
		this.bounds = this.calculateBounds()
		// Set canvas dimension
		this.canvas.setAttribute('width', this.bounds.w)
		this.canvas.setAttribute('height', this.bounds.h)
		this.canvas.style.width = this.bounds.w + 'px'
		this.canvas.style.height = this.bounds.h + 'px'
	}

	draw() {
		if (this.animate) {
			this.ctx.clearRect(0, 0, this.bounds.w, this.bounds.h)
			this.ctx.strokeRect(this.bounds.center.x, this.bounds.center.y, 100, 100)
			this.ctx.stroke()
			requestAnimationFrame(() => this.draw())
		}
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
