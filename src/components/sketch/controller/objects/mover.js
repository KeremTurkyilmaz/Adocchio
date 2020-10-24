export default class Mover {
	constructor() {
		this.bounds = {
			w: window.innerWidth,
			h: window.innerHeight
		}
		this.pos = { x: 0, y: 0 }

		this.range = {
			x: this.bounds.w / 2.2,
			y: this.bounds.h / 2.2
		}
		this.limit = {
			x: Math.round(Math.random() * 9) + 1,
			y: Math.round(Math.random() * 9) + 1
		}

		// setInterval(() => {
		// 	console.log('Update Trajectory')
		// 	this.updateTrajectory();
		// }, 5000)

	}

	updateTrajectory() {
		this.limit = {
			x: Math.round(Math.random() * 9) + 1,
			y: Math.round(Math.random() * 9) + 1
		}
	}

	update(time) {
		this.pos.x = this.range.x * Math.sin(this.limit.x * time) + this.bounds.w / 2
		this.pos.y = this.range.y * Math.sin(this.limit.y * time) + this.bounds.h / 2
	}

	render(ctx) {
		ctx.save()
		ctx.fillStyle = '#00FF00'
		ctx.beginPath()
		ctx.ellipse(this.pos.x, this.pos.y, 20, 20, 0, 0, Math.PI * 2)
		ctx.stroke()
		ctx.fill()
	}

	get position() {
		return this.pos
	}
}
