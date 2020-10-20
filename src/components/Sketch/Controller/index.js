export default class Controller {
	constructor(options = {}) {
		console.log('Initialize Controller', options)
		this.options = options
		this.canvas = options.canvas
	stop() {
		this.animate = false
		this.ctx.clearRect(0, 0, this.bounds.w, this.bounds.h)
	}

	start() {
		this.animate = true
		this.draw()
	}
}
