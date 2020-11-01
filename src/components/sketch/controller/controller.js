import S_Grid from './scene/S_Grid'

export default class Controller {
	constructor(options = {}) {
		console.log('Initialize Controller', options)
		this.options = options
		this.debug = options.debug
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

		/*
		 * --------------------
		 * Scene setup
		 * --------------------
		 */

		// Current Scene
		this.currentScene = 0

		// Options object to be pass to the scene class
		this.options = {
			ctx: this.ctx,
			bounds: this.bounds,
			debug: this.debug
		}

		// List of scenes
		this.scenes = []

		// Let's add some scene to the scenes list
		this.scenes.push(new S_Grid(this.options))

		// Init scene
		this.setScene(this.currentScene)
	}

	setScene(index) {
		console.log('Init Scene nr.' + index)
		this.scene = this.scenes[index]

		// Launch Shared scene setup
		this.scene.setup()

		// Launch Custom scene init
		this.scene.init()
	}

	draw() {
		if (this.animate) {
			this.scene.pre()
			this.scene.update()
			this.scene.render(this.debug)
			this.scene.post()
			requestAnimationFrame(() => this.draw())
		} else {
			this.scene.clear()
			window.cancelAnimationFrame(this.draw)
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
