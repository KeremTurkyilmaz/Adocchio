export default class Scene {
	constructor(options = {}) {
		this.options = options
		this.ctx = options.ctx
		this.bounds = options.bounds
		this.frames = 0
		this.coordinates = {
			x: 0,
			y: 0
		}
	}
	pre() {
		// Clear the background
		this.ctx.clearRect(0, 0, this.bounds.w, this.bounds.h)

		// Display current frame
		this.ctx.fillText(this.frames, 10, 20)

		// Save context state
		this.ctx.save()
	}
	update(coordinates) {
		if (!this.eyes) return

		// Increment frames
		this.frames++

		// If the coordinates are the same, return
		// Otherwise continue and update the coordinates
		if (this.coordinates === coordinates) return
		this.coordinates = coordinates

		// Update eyes, follow the coordinates
		this.eyes.forEach(eye => {
			eye.follow(this.coordinates)
		})
	}
	render() {
		if (!this.eyes) return

		// Draw eyes
		this.eyes.forEach(eye => {
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

}
