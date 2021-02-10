import S_Grid from './scene/S_Grid'

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

		/*
		 * --------------------
		 * Scene setup
		 * --------------------
		 */

		// Current Scene
		this.currentScene = 0

		// Options object to be pass to the scene class
		this.options = {
			...this.options,
			ctx: this.ctx,
			bounds: this.bounds
		}

		console.log(this.options, '...')

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

	// Draw scene
	draw() {
		if (this.animate) {
			// Clear and save context
			this.scene.pre()

			// Update scene
			this.scene.update()

			// Render scene
			this.scene.render(this.options.debug)

			// Restore context and draw frameCount
			this.scene.post()

			// Recall draw function
			requestAnimationFrame(() => this.draw())
		} else {
			// Clear scene
			this.scene.clear()
			// Delete the animation frame
			window.cancelAnimationFrame(this.draw)
		}
	}

	calculateBounds() {
		// Get canvas parent
		const container = this.canvas.parentNode
		// Get parent bounds
		const containerSize = container.getBoundingClientRect()
		// Create a custom object with some properties
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
		// Stop animation
		this.animate = false
		// Clear the canvas
		this.ctx.clearRect(0, 0, this.bounds.w, this.bounds.h)
	}

	start() {
		// Start Animation
		this.animate = true

		// Invoce draw function
		this.draw()
	}
}
