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

export const lerp = (start, end, amt) => {
	return (1 - amt) * start + amt * end
}

// Generate a random integer with min and max included
export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Conver angle to radians
export const radians = angle => (angle * Math.PI) / 180.0;

export const calculateGrid = (options = {}) => {

	// Check props
	const modulo = options.modulo || 100
	const bounds = options.bounds || { w: window.innerWidth, h: window.innerHeight }

	// Calculate maximum rows and columns
	const cols = Math.floor(bounds.width / modulo)
	const rows = Math.floor(bounds.height / modulo)


	// Calculate the size of all rows and columns
	const dim = {
		x: cols * modulo,
		y: rows * modulo
	}

	// Calculate the remaining space
	const offX = bounds.width - dim.x
	const offY = bounds.height - dim.y

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
