import { resize } from '@/utils'


export default class Eye {
	constructor(options = {}) {
		this.origin = options.origin // Eye origin
		this.radius = options.radius // Eye Radius
		this.ctx = options.ctx // Context
		this.assets = options.assets // Assets
		this.mover = options.mover // Mover Reference
		this.scale = options.scale || 1
		this.center = {
			// Eye center
			x: this.origin.x + this.radius / 2,
			y: this.origin.y + this.radius / 2
		}
		// Assing each sprites
		this.eye = this.assets.find(p => p.name === 'eye') // Eye asset
		this.iris = this.assets.find(p => p.name === 'iris') // Iris asset
		this.pupil = this.assets.find(p => p.name === 'pupil') // Pupil asset

		resize(this.eye.image, this.radius, this.radius)
		resize(this.iris.image, this.radius, this.radius)
		resize(this.pupil.image, this.radius, this.radius)

		// Iris and Pupil Radius
		this.iris_radius = this.radius * 0.7
		this.pupil_radius = this.radius * 0.4

		// Function that returns the arcsine (in radians) of a number
		this.iris_arc = Math.asin(this.iris_radius / this.radius)

		// Iris
		this.iris_r = this.radius * Math.cos(this.iris_arc)

		// Pos
		this.pos = { x: 0, y: 0 }
	}

	dPunti(x0, y0, x1, y1) {
		return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0))
	}

	follow(coordinates) {
		this.angle = Math.atan2(coordinates.y - this.center.y, coordinates.x - this.center.x)
		this.mouse_rad = this.dPunti(this.center.x, this.center.y, coordinates.x, coordinates.y)
		this.eye_angle = Math.atan(this.mouse_rad / this.iris_r) * 0.7
		this.pos.x = this.iris_r * Math.sin(this.eye_angle)
	}

	render(debug) {
		// Eye
		this.ctx.save()
		this.ctx.translate(this.center.x, this.center.y)
		this.ctx.scale(this.scale, this.scale)
		this.ctx.drawImage(this.eye.image, -this.eye.image.width / 2, -this.eye.image.width / 2, this.eye.image.width, this.eye.image.height)
		this.ctx.restore()

		this.ctx.save()
		this.ctx.translate(this.center.x, this.center.y)
		this.ctx.rotate(this.angle)
		this.ctx.scale(this.scale*0.8, this.scale*0.8)
		this.ctx.translate(this.pos.x, this.pos.y)

		// Iris
		this.ctx.drawImage(this.iris.image, -this.iris_radius / 2, -this.iris_radius / 2, this.iris_radius * Math.cos(this.eye_angle), this.iris_radius)
		// Pupil
		this.ctx.drawImage(this.pupil.image, -this.pupil_radius / 2, -this.pupil_radius / 2, this.pupil_radius * Math.cos(this.eye_angle), this.pupil_radius)

		this.ctx.restore()

		// Draw rectangle based on detection coordinates
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
