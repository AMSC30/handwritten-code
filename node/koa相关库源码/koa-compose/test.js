const compose = require('./mini-compose')
const f1 = async function (ctx, next) {
	console.log('f1')
	await next()
	console.log('delay')
}
const f2 = async function (ctx, next) {
	console.log('f2')
	await next()
}
compose([f1, f2])(null, () => {
	console.log('last fn')
})
