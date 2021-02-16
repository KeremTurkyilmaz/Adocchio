import Mover from '../objects/mover'
import { random } from '@/utils'

export default class Scene {
	constructor() {}

	setup() {
		this.frameCount = 0
		this.mode = 'detection'
		this.eyes = []
		this.center = {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		}
		this.coordinates = {
			x: this.center.x,
			y: this.center.y
		}
		this.des = {
			x: 0,
			y: 0
		}
		// Create n random movers
		this.movers = []
		for (let id = 0; id < 20; id++) {
			this.movers.push(new Mover({ id }))
		}
	}

	pre() {
		// Clear the background
		// Save context state
		this.ctx.clearRect(0, 0, this.bounds.w, this.bounds.h)
		this.ctx.save()
	}

	startInterval() {
		this.myInterval = setInterval(() => {
			this.redrawGrid()
		}, 60000)
	}

	stopInterval() {
		clearInterval(this.myInterval)
	}

	redrawGrid() {
		this.removeItems().then(() => {
			setTimeout(() => {
				const dim = random(this.options.min, this.options.max)
				console.log('Dim Random', dim)
				this.init(dim)
			}, 2000)
		})
	}

	removeItems() {
		const promises = []
		for (let i = 0; i < this.eyes.length; i++) {
			promises.push(
				new Promise(resolve => {
					setTimeout(() => {
						this.eyes.pop()
						resolve()
					}, 50 * i)
				})
			)
		}
		return Promise.all(promises)
	}

	update() {
		// Increment frameCount
		this.frameCount++

		// Update movers only on idle mode
		if (this.mode === 'idle') {
			this.movers.forEach(mover => {
				mover.update(this.frameCount * 0.0015)
			})
		} else {
			// Interpolation with damping
			this.coordinates.x += this.des.x * this.damp
			this.coordinates.y += this.des.y * this.damp
		}
	}

	render(debug) {
		// Eyes update and render
		this.eyes.forEach(eye => {
			// Eye follow the detection coordinates
			if (this.mode === 'detection') eye.follow(this.coordinates)

			// Eye follow it's own movers
			if (this.mode === 'idle') {
				this.movers.forEach(mover => {
					if (eye.mover === mover.id) {
						eye.follow(mover.position)
					}
				})
			}
			// Render eye
			eye.render(debug)
		})

		// Draw dots only on debug mode
		if (debug) {
			this.ctx.fillText(this.frameCount, 10, 20)
			// Detection coordinates
			if (this.mode === 'detection') drawDot(this.ctx, this.coordinates)
			// Draw mover
			if (this.mode === 'idle') {
				this.movers.forEach(mover => {
					drawDot(this.ctx, mover.position)
				})
			}
		}
	}

	post() {
		// Restore context state
		this.ctx.restore()
	}

	set setMode(mode) {
		// Set scene mode -> 'detection' or 'idle'
		console.log('Update scene mode ' + mode)
		if (mode === 'idle') this.startInterval()
		if (mode === 'detection') this.stopInterval()
		this.mode = mode
	}

	set updateCoordinates(coord) {
		// Calculate new destination
		this.des = {
			x: coord.x - this.coordinates.x,
			y: coord.y - this.coordinates.y
		}
	}
}

const drawDot = (ctx, pos) => {
	ctx.fillStyle = '#FF0FFF'
	ctx.beginPath()
	ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI)
	ctx.fill()
}
