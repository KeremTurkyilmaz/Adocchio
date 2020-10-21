import { radians, resize, random } from '@/utils'

const debug = true

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

		// Eye radius scaled
		this.r = this.radius

		// Load all sprites
		this.eye = this.loadImage('sprites', `eye.png`)
		this.iris = this.loadImage('sprites', `iris.png`)
		this.pupil = this.loadImage('sprites', `pupil.png`)
		this.eyeClosed = this.loadImage('sprites', `closed.png`)

		// Check if the eye is closed
		this.isClosed = false

		// Dummy method for close an eye
		let interval = random(3000, 20000)
		setInterval(() => {
			this.isClosed = !this.isClosed
			interval = random(1000, 2000)
		}, interval)
	}

	// Load image from assets folder
	loadImage(folder, file) {
		const img = new Image()
		const source = require(`@/assets/${folder}/${file}`)
		img.onload = () => {
			resize(img, this.r, this.r)
			this.isLoaded = true
		}
		img.setAttribute('src', source)
		return img
	}

	dPunti(x0, y0, x1, y1) {
		return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0))
	}

	follow(coordinates) {
		this.mouse_ang = Math.atan2(coordinates.y - this.center.y, coordinates.x - this.center.x)
		this.mouse_rad = this.dPunti(this.center.x, this.center.y, coordinates.x, coordinates.y)
		this.iris_radius = this.r * 0.7
		this.pupil_radius = this.r * 0.4
		this.iris_arc = Math.asin(this.iris_radius / this.r)
		this.iris_r = this.r * Math.cos(this.iris_arc)
		this.eye_ang = Math.atan(this.mouse_rad / this.iris_r) * 0.7
		if (this.eye_ang > radians(90) - this.iris_arc) this.eye_ang = radians(90) - this.iris_arc
	}

	render(ctx) {
		if (!this.isClosed) {
			ctx.save()
			ctx.translate(this.center.x, this.center.y)
			ctx.drawImage(this.eye, -this.eye.width / 2, -this.eye.height / 2, this.eye.width, this.eye.height)
			ctx.restore()

			ctx.save()
			ctx.translate(this.center.x, this.center.y)
			ctx.rotate(this.mouse_ang)
			ctx.scale(0.8, 0.8)

			// Iris
			ctx.save()
			ctx.translate(this.iris_r * Math.sin(this.eye_ang), 0)
			ctx.drawImage(this.iris, -this.iris_radius / 2, -this.iris_radius / 2, this.iris_radius * Math.cos(this.eye_ang), this.iris_radius)
			ctx.restore()

			// Pupil
			ctx.save()
			ctx.translate(this.iris_r * Math.sin(this.eye_ang), 0)
			ctx.drawImage(this.pupil, -this.pupil_radius / 2, -this.pupil_radius / 2, this.pupil_radius * Math.cos(this.eye_ang), this.pupil_radius)
			ctx.restore()
			ctx.restore()
		} else {
			ctx.save()
			ctx.translate(this.center.x, this.center.y)
			ctx.drawImage(this.eyeClosed, -this.eyeClosed.width / 2, -this.eyeClosed.height / 2, this.eyeClosed.width, this.eyeClosed.height)
			ctx.restore()
		}

		if (debug) {
			ctx.strokeStyle = 'gray'
			ctx.strokeRect(this.origin.x, this.origin.y, this.radius, this.radius)
		}
	}
}
