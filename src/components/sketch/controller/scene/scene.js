export default class Scene {
	constructor(options = {}) {
		this.options = options
		this.ctx = options.ctx
		this.bounds = options.bounds
		this.frameCount = 0
		this.mode = 'sketch'
		this.eyes = []
		this.coordinates = {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		}
	}

	pre() {
		// Clear the background
		// Display current frame
		// Save context state
		this.ctx.clearRect(0, 0, this.bounds.w, this.bounds.h)
		this.ctx.fillText(this.frameCount, 10, 20)
		this.ctx.save()
	}

	update() {
		if (!this.eyes) return
		if (this.frameCount % 120 == 0) console.log(this.mode)

		// Increment frameCount
		this.frameCount++
	}

	render() {
		if (!this.eyes) return

		// Draw eyes
		this.eyes.forEach(eye => {
			eye.follow(this.coordinates)
			eye.render(this.ctx)
		})

		// Draw an ellipse according to the coordinates
		this.ctx.fillStyle = '#FF0000'
		this.ctx.beginPath()
		this.ctx.arc(this.coordinates.x, this.coordinates.y, 20, 0, 2 * Math.PI)
		this.ctx.fill()
	}

	post() {
		// Restore context sate
		this.ctx.restore()
	}

	set setMode(mode) {
		console.log('Update scene mode ' + mode)
		this.mode = mode
	}

	set updateCoordinates(coord) {
		// If the coordinates are the same, return
		// Otherwise continue and update the coordinates
		if (this.coordinates === coord) return
		this.coordinates = coord
	}
}
