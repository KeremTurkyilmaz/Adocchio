// Resize element
export const resize = (el, w, h) => {
	el.width = w
	el.height = h
}

// Resize a DOM element through css
export const resizeCSS = (el, s) => {
	el.style.width = el.width * s + 'px'
	el.style.height = el.height * s + 'px'
}

// Returns a number whose value is limited to the given range.
export const clamp = (num, min, max) => {
	return num <= min ? min : num >= max ? max : num
}

// Normalize a value
export const normalize = (val, min, max) => (val - min) / (max - min)

// Linear interpolate the vector to another vector
export const lerp = (start, end, amt) => {
	return (1 - amt) * start + amt * end
}

// Generate a random integer with min and max included
export const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

// Re-maps a number from one range to another.
export function map(n, in_min, in_max, out_min, out_max) {
	return ((n - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

// Convert angle to radians
export const radians = angle => (angle * Math.PI) / 180.0

export const calculateGrid = (options = {}) => {
	// Check props
	const modulo = options.modulo || 100
	const bounds = options.bounds || { w: window.innerWidth, h: window.innerHeight }

	// Calculate maximum rows and columns
	const cols = Math.floor(bounds.w / modulo)
	const rows = Math.floor(bounds.h / modulo)

	// Calculate the size of all rows and columns
	const dim = {
		x: cols * modulo,
		y: rows * modulo
	}

	// Calculate the remaining space
	const offX = bounds.w - dim.x
	const offY = bounds.h - dim.y

	// Calcualte the padding between each column and row
	const pad = {
		x: offX / (cols + 1),
		y: offY / (rows + 1)
	}

	return {
		cols: cols,
		rows: rows,
		pad: pad
	}
}
