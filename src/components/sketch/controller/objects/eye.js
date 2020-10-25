import { resize } from '@/utils'

const debug = false

export default class Eye {
	constructor(options = {}) {
		// Eyr origin
		this.origin = options.origin

		// Eye Radius
		this.radius = options.radius

		// Eye center
		this.center = {
			x: this.origin.x + this.radius / 2,
			y: this.origin.y + this.radius / 2
		}

		// Load all sprites
		this.eye = this.loadImage('sprites', `eye.png`)
		this.iris = this.loadImage('sprites', `iris.png`)
		this.pupil = this.loadImage('sprites', `pupil.png`)
		this.eye_closed = this.loadImage('sprites', `closed.png`)

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

	render(ctx) {
		if (!this.isClosed) {
			// Eye
			ctx.save()
			ctx.translate(this.center.x, this.center.y)
			ctx.drawImage(this.eye, -this.eye.width / 2, -this.eye.height / 2, this.eye.width, this.eye.height)
			ctx.restore()

			ctx.save()
			ctx.translate(this.center.x, this.center.y)
			ctx.rotate(this.angle)
			ctx.scale(0.8, 0.8)

			// Iris
			ctx.save()
			ctx.translate(this.pos.x, this.pos.y)
			ctx.drawImage(this.iris, -this.iris_radius / 2, -this.iris_radius / 2, this.iris_radius * Math.cos(this.eye_angle), this.iris_radius)
			ctx.restore()

			// Pupil
			ctx.save()
			ctx.translate(this.pos.x, this.pos.y)
			ctx.drawImage(this.pupil, -this.pupil_radius / 2, -this.pupil_radius / 2, this.pupil_radius * Math.cos(this.eye_angle), this.pupil_radius)
			ctx.restore()
			ctx.restore()
		} else {
			// Draw closed eye
			ctx.save()
			ctx.translate(this.center.x, this.center.y)
			ctx.drawImage(this.eye_closed, -this.eye_closed.width / 2, -this.eye_closed.height / 2, this.eye_closed.width, this.eye_closed.height)
			ctx.restore()
		}

		if (debug) {
			ctx.strokeStyle = 'gray'
			ctx.strokeRect(this.origin.x, this.origin.y, this.radius, this.radius)

			ctx.beginPath()
			ctx.moveTo(this.origin.x, this.origin.y)
			ctx.lineTo(this.origin.x + this.radius, this.origin.y + this.radius)
			ctx.stroke()

			ctx.beginPath()
			ctx.moveTo(this.origin.x, this.origin.y + this.radius)
			ctx.lineTo(this.origin.x + this.radius, this.origin.y)
			ctx.stroke()

			ctx.beginPath()
			ctx.ellipse(this.center.x, this.center.y, 20, 20, 0, 0, Math.PI * 2)
			ctx.stroke()
		}
	}
}
