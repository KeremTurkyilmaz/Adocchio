import Mover from '../objects/mover'
import { random } from '@/utils'

export default class Scene {
	constructor(options = {}) {
		this.options = options
		this.ctx = options.ctx
		this.bounds = options.bounds
		this.debug = options.debug
		this.damp = options.damp
	}

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
		// Create n random movers
		this.movers = []
		for (let i = 0; i < 20; i++) {
			this.movers.push(new Mover({ id: i }))
		}

		this.eyesTimeout = null
	}

	pre() {
		// Clear the background
		// Save context state
		this.ctx.clearRect(0, 0, this.bounds.w, this.bounds.h)
		this.ctx.save()
	}

	update() {
		// Increment frameCount
		this.frameCount++

		// Update movers only on idle mode
		if (this.mode === 'idle') {
			this.movers.forEach(mover => {
				mover.update(this.frameCount * 0.0015)
			})
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
					if (eye.moverId === mover.id) {
						eye.follow(mover.position)
					}
				})
			}
			// Render eye
			eye.render(debug)
		})

		// Draw dots only on debug mode
		if (this.debug) {
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
		// Display current frame
		if (this.debug) {
			this.ctx.fillText(this.frameCount, 10, 20)
		}

		// Restore context state
		this.ctx.restore()
	}

	toggleEyesBehavior() {
		if (this.mode === 'idle') {
			this.eyes.forEach(eye => {
				let time = random(5000, 10000)
				this.eyesTimeout = function() {
					console.log('Ciao')
					time = random(5000, 10000)
					eye.closeEye = !eye.isClosed
					setTimeout(this.eyesTimeout, time)
				}
				setTimeout(this.eyesTimeout, time)
			})
		}
		if (this.mode === 'detection') {
			clearTimeout(this.eyesTimeout)
			this.eyes.forEach(eye => {
				eye.closeEye = false
			})
		}
	}

	set setMode(mode) {
		// Set scene mode -> 'detection' or 'idle'
		console.log('Update scene mode ' + mode)
		this.mode = mode
		// this.toggleEyesBehavior()
	}

	set updateCoordinates(coord) {
		// Calculate new destination
		const des = {
			x: coord.x - this.coordinates.x,
			y: coord.y - this.coordinates.y
		}
		// Interpolation with damping
		this.coordinates.x += des.x * this.damp
		this.coordinates.y += des.y * this.damp
		// If the coordinates are the same, return
		// if (this.coordinates === coord) return
	}
}

const drawDot = (ctx, pos) => {
	ctx.fillStyle = '#FF0FFF'
	ctx.beginPath()
	ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI)
	ctx.fill()
}
