import { resize } from '@/utils'

export default class Eye {
	constructor(options = {}) {
		// Eyr origin
		this.origin = options.origin

		// Eye Radius
		this.radius = options.radius

		// Context
		this.ctx = options.ctx

		// Eye center
		this.center = {
			x: this.origin.x + this.radius / 2,
			y: this.origin.y + this.radius / 2
		}

		this.moverId = options.moverId

		// Load all sprites
		this.eye_open = this.loadImage('sprites', `eye.png`)
		this.eye_closed = this.loadImage('sprites', `eye_closed.png`)
		this.iris = this.loadImage('sprites', `iris.png`)
		this.pupil = this.loadImage('sprites', `pupil.png`)

		// Iris and Pupil Radius
		this.iris_radius = this.radius * 0.7
		this.pupil_radius = this.radius * 0.4

		// Function that returns the arcsine (in radians) of a number
		this.iris_arc = Math.asin(this.iris_radius / this.radius)

		//
		this.iris_r = this.radius * Math.cos(this.iris_arc)

		// Check if the eye is closed
		this.isClosed = false

		// Pos
		this.pos = { x: 0, y: 0 }
	}

	// Load image from assets folder
	loadImage(folder, file) {
		const img = new Image()
		const source = require(`@/assets/${folder}/${file}`)
		img.onload = () => {
			resize(img, this.radius, this.radius)
			this.isLoaded = true
		}
		img.setAttribute('src', source)
		return img
	}

	dPunti(x0, y0, x1, y1) {
		return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0))
	}

	follow(coordinates) {
		this.angle = Math.atan2(coordinates.y - this.center.y, coordinates.x - this.center.x)
		this.mouse_rad = this.dPunti(this.center.x, this.center.y, coordinates.x, coordinates.y)
		this.eye_angle = Math.atan(this.mouse_rad / this.iris_r) * 0.7
		this.pos.x = this.iris_r * Math.sin(this.eye_angle)
		// if (this.eye_angle > radians(90) - this.iris_arc) this.eye_angle = radians(90) - this.iris_arc
	}

	set closeEye(val) {
		this.isClosed = val
	}

	render(debug) {
		if (!this.isClosed) {
			// Eye
			this.ctx.save()
			this.ctx.translate(this.center.x, this.center.y)
			this.ctx.drawImage(this.eye_open, -this.eye_open.width / 2, -this.eye_open.height / 2, this.eye_open.width, this.eye_open.height)
			this.ctx.restore()

			this.ctx.save()
			this.ctx.translate(this.center.x, this.center.y)
			this.ctx.rotate(this.angle)
			this.ctx.scale(0.8, 0.8)

			// Iris
			this.ctx.save()
			this.ctx.translate(this.pos.x, this.pos.y)
			this.ctx.drawImage(this.iris, -this.iris_radius / 2, -this.iris_radius / 2, this.iris_radius * Math.cos(this.eye_angle), this.iris_radius)
			this.ctx.restore()

			// Pupil
			this.ctx.save()
			this.ctx.translate(this.pos.x, this.pos.y)
			this.ctx.drawImage(this.pupil, -this.pupil_radius / 2, -this.pupil_radius / 2, this.pupil_radius * Math.cos(this.eye_angle), this.pupil_radius)
			this.ctx.restore()
			this.ctx.restore()
		} else {
			// Draw closed eye
			this.ctx.save()
			this.ctx.translate(this.center.x, this.center.y)
			this.ctx.drawImage(this.eye_closed, -this.eye_closed.width / 2, -this.eye_closed.height / 2, this.eye_closed.width, this.eye_closed.height)
			this.ctx.restore()
		}

		if (debug) {
			this.ctx.strokeStyle = 'gray'
			this.ctx.strokeRect(this.origin.x, this.origin.y, this.radius, this.radius)

			this.ctx.beginPath()
			this.ctx.moveTo(this.origin.x, this.origin.y)
			this.ctx.lineTo(this.origin.x + this.radius, this.origin.y + this.radius)
			this.ctx.stroke()

			this.ctx.beginPath()
			this.ctx.moveTo(this.origin.x, this.origin.y + this.radius)
			this.ctx.lineTo(this.origin.x + this.radius, this.origin.y)
			this.ctx.stroke()

			this.ctx.beginPath()
			this.ctx.ellipse(this.center.x, this.center.y, 20, 20, 0, 0, Math.PI * 2)
			this.ctx.stroke()
		}
	}
}
