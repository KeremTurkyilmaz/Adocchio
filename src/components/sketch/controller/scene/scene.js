export default class Scene {
	constructor(options = {}) {
		this.options = options
		this.ctx = options.ctx
		this.bounds = options.bounds
		this.frames = 0
		this.eyes = []
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

	set updateCoordinates(coord) {
		// If the coordinates are the same, return
		// Otherwise continue and update the coordinates
		if (this.coordinates === coord) return
		this.coordinates = coord
	}
}
