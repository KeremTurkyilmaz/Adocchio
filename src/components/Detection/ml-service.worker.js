import { setupWorkerListeners, setupWorkerEmitters, normalize } from '@/utils'
setupWorkerListeners(self)
setupWorkerEmitters(self)

// import FaceDetector from 'facedetector'

self.emit('ready', true)

// self.on('data', d => {
// 	function normalizeBoundingBox(box) {
// 		const sourceArea = d.width * d.height
// 		const x = normalize(box.x, 0, d.width)
// 		const y = normalize(box.y, 0, d.height)
// 		const width = normalize(box.width, 0, d.width)
// 		const height = normalize(box.height, 0, d.height)
// 		const area = normalize(box.width * box.height, 0, sourceArea)
// 		return {
// 			x,
// 			y,
// 			width,
// 			height,
// 			area,
// 			center: {
// 				x: x + width / 2,
// 				y: y + height / 2
// 			}
// 		}
// 	}
// 	try {
// 		faceDetector.detect(d.data).then(faces => {
// 			let results = []
// 			if (faces && faces.length) {
// 				results = faces.map(f => {
// 					return normalizeBoundingBox(f.boundingBox)
// 				})
// 			}
// 			self.emit('results', results)
// 		})
// 	} catch (e) {
// 		console.error('Face detection failed:', e)
// 	}
// })

// self.on('init', d => {
// 	this.faceDetector = new FaceDetector({
// 		video: d
// 	})
// 	console.log(this.faceDetector)
// })
