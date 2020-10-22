export default class Mover {
	constructor(options = {}) {
		this.options = options
		this.damp = 0.01
		this.pos = { x: 0, y: 0 }
		this.des = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
	}

	newPos(des) {
		this.des = des
	}

	update() {
		const dx = (this.des.x - this.pos.x) * this.damp
		const dy = (this.des.y - this.pos.y) * this.damp
		this.pos.x += dx
		this.pos.y += dy
	}

	render(ctx) {
		ctx.save()
		ctx.beginPath()
		ctx.ellipse(this.pos.x, this.pos.y, 20, 20, 0, 0, Math.PI * 2)
		ctx.stroke()
		ctx.restore()
	}

	get position() {
		return this.pos
	}
}
