export const resize = (el, w, h) => {
  el.width = w
  el.height = h
}

export const create = (tag, options = {}, container = null) => {
  const el = document.createElement(tag)
  for (const opt in options) {
    el[opt] = options[opt]
  }
  if (container) container.appendChild(el)
  return el
}

export const clamp = (num, min, max) => {
  return num <= min ? min : num >= max ? max : num;
}

export const normalize = (val, min, max) => (val - min) / (max - min);

export const setupWorkerListeners = (obj) => {
  obj.listeners = []
  obj.on = (channel, callback) => {
    obj.listeners.push({ channel, callback })
  }
  obj.onmessage = (m) => {
    obj.listeners.forEach(l => {
      if (l.channel === m.data.channel) l.callback(m.data.value)
    });
  }
}

export const setupWorkerEmitters = (obj) => {
  obj.emit = (channel, value) => {
    obj.postMessage({ channel, value })
  }
  obj.send = obj.emit
}

export const max = (array, iterator) => {
  return array.reduce(function (prev, current) {
    return (iterator(prev) > iterator(current)) ? prev : current
  })
}

export const distance = (p, t) => {
  const a = p.x - t.x;
  const b = p.y - t.y;
  return Math.hypot(a, b);
}

export const lerp = (start, end, amt) => {
  return (1 - amt) * start + amt * end
}

export class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject
      this.resolve = resolve
    })
  }
}
