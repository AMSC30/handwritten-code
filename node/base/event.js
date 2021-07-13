const EventEmitter = require('events')
const emitter = new EventEmitter()

// 注册事件
// emitter.on('look', name => {
// 	console.log(`${name},look`)
// })
// emitter.addListener('look', name => {
// 	console.log(`${name},watch`)
// })

// 触发事件
// emitter.emit('look', 'tom')

// 查询事件名
// console.log(emitter.eventNames())

// 查询监听器回调
// console.log(emitter.listeners('look'))

// 查询监听器回调数量
// console.log(emitter.listenerCount('look'))

// 取消监听
// emitter.off('look', fn)
// emitter.removeListener('look',fn)
// emitter.removeAllListeners('look')

// console.log(emitter.getMaxListeners())
// emitter.setMaxListeners(20)
