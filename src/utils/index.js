export const resize = (el, w, h) => {
	el.width = w
	el.height = h
}

export const resizeCSS = (el, s) => {
	el.style.width = el.width * s + 'px'
	el.style.height = el.height * s + 'px'
}

export const clamp = (num, min, max) => {
	return num <= min ? min : num >= max ? max : num
}

export const normalize = (val, min, max) => (val - min) / (max - min)

export const setupWorkerListeners = obj => {
	obj.listeners = []
	obj.on = (channel, callback) => {
		obj.listeners.push({ channel, callback })
	}
	obj.onmessage = m => {
		obj.listeners.forEach(l => {
			if (l.channel === m.data.channel) l.callback(m.data.value)
		})
	}
}

export const setupWorkerEmitters = obj => {
	obj.emit = (channel, value) => {
		obj.postMessage({ channel, value })
	}
	obj.send = obj.emit
}

export const lerp = (start, end, amt) => {
	return (1 - amt) * start + amt * end
}
