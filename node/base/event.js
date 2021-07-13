const EventEmitter = require('events')
const event = new EventEmitter()

event.on('look', name => {
	console.log(`${name},look`)
})

const timer = setInterval(() => {
	event.emit('look', 'tom')
}, 1000)

setTimeout(() => {
	clearInterval(timer)
}, 5000)
