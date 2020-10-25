import Mover from '../objects/mover'
import { random } from '@/utils'

export default class Scene {
	constructor(options = {}) {
		this.options = options
		this.ctx = options.ctx
		this.bounds = options.bounds
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
		this.mover = new Mover()
		this.eyesTimeout = null
	}

	pre() {
		// Clear the background
		// Display current frame
		// Save context state
		this.ctx.clearRect(0, 0, this.bounds.w, this.bounds.h)
		this.ctx.fillText(this.frameCount, 10, 20)
		this.ctx.save()
	}

	update() {
		if (!this.eyes) return
		// if (this.frameCount % 120 == 0) console.log(this.mode)

		// Increment frameCount
		this.frameCount++

		if (this.mode === 'idle') {
			// Update mover
			this.mover.update(this.frameCount * 0.002)
			//  Get mover position during Idle mode
			this.moverCoordinates = this.mover.position
		}
	}

	render() {
		this.eyes.forEach(eye => {
			if (this.mode === 'detection') eye.follow(this.coordinates)
			if (this.mode === 'idle') eye.follow(this.moverCoordinates)
			eye.render()
		})

		// Detection coordinates
		if (this.mode === 'detection') drawDot(this.ctx, this.coordinates)
		// Draw mover
		if (this.mode === 'idle') drawDot(this.ctx, this.moverCoordinates)
	}

	post() {
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
		this.toggleEyesBehavior();
	}

	set updateCoordinates(coord) {
		// If the coordinates are the same, return
		if (this.coordinates === coord) return
		this.coordinates = coord
	}
}

const drawDot = (ctx, pos) => {
	ctx.fillStyle = '#FF0FFF'
	ctx.beginPath()
	ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI)
	ctx.fill()
}
