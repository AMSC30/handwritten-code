'use strict'

const debug = require('debug')('koa:application')
const onFinished = require('on-finished')
const response = require('./response')
const compose = require('koa-compose')
const context = require('./context')
const request = require('./request')
const statuses = require('statuses')
const Emitter = require('events')
const util = require('util')
const Stream = require('stream')
const http = require('http')
const only = require('only')
const { HttpError } = require('http-errors')

module.exports = class Application extends Emitter {
	constructor(options) {
		super()
		options = options || {}

		this.proxy = options.proxy || false

		this.subdomainOffset = options.subdomainOffset || 2

		this.proxyIpHeader = options.proxyIpHeader || 'X-Forwarded-For'
		this.maxIpsCount = options.maxIpsCount || 0

		this.env = options.env || process.env.NODE_ENV || 'development'

		options.keys && (this.keys = options.keys)

		this.middleware = []
		this.context = Object.create(context)
		this.request = Object.create(request)
		this.response = Object.create(response)
	}

	listen(...args) {
		const server = http.createServer(this.callback())
		return server.listen(...args)
	}

	toJSON() {
		return only(this, ['subdomainOffset', 'proxy', 'env'])
	}

	inspect() {
		return this.toJSON()
	}

	use(fn) {
		this.middleware.push(fn)
		return this
	}

	callback() {
		const fn = compose(this.middleware)

		if (!this.listenerCount('error')) this.on('error', this.onerror)

		return (req, res) => {
			const ctx = this.createContext(req, res)
			return this.handleRequest(ctx, fn)
		}
	}

	handleRequest(ctx, fnMiddleware) {
		const res = ctx.res
		res.statusCode = 404
		const onerror = err => ctx.onerror(err)
		const handleResponse = () => respond(ctx)
		onFinished(res, onerror)
		return fnMiddleware(ctx).then(handleResponse).catch(onerror)
	}

	createContext(req, res) {
		const context = Object.create(this.context)
		const request = (context.request = Object.create(this.request))
		const response = (context.response = Object.create(this.response))
		context.app = request.app = response.app = this
		context.req = request.req = response.req = req
		context.res = request.res = response.res = res
		request.ctx = response.ctx = context
		request.response = response
		response.request = request
		context.originalUrl = request.originalUrl = req.url
		context.state = {}
		return context
	}

	onerror(err) {
		const isNativeError =
			Object.prototype.toString.call(err) === '[object Error]' || err instanceof Error
		if (!isNativeError) throw new TypeError(util.format('non-error thrown: %j', err))

		if (404 === err.status || err.expose) return
		if (this.silent) return

		const msg = err.stack || err.toString()
		console.error(`\n${msg.replace(/^/gm, '  ')}\n`)
	}

	static get default() {
		return Application
	}
}

function respond(ctx) {
	// allow bypassing koa
	if (false === ctx.respond) return

	if (!ctx.writable) return

	const res = ctx.res
	let body = ctx.body
	const code = ctx.status

	// ignore body
	if (statuses.empty[code]) {
		// strip headers
		ctx.body = null
		return res.end()
	}

	if ('HEAD' === ctx.method) {
		if (!res.headersSent && !ctx.response.has('Content-Length')) {
			const { length } = ctx.response
			if (Number.isInteger(length)) ctx.length = length
		}
		return res.end()
	}

	// status body
	if (null == body) {
		if (ctx.response._explicitNullBody) {
			ctx.response.remove('Content-Type')
			ctx.response.remove('Transfer-Encoding')
			return res.end()
		}
		if (ctx.req.httpVersionMajor >= 2) {
			body = String(code)
		} else {
			body = ctx.message || String(code)
		}
		if (!res.headersSent) {
			ctx.type = 'text'
			ctx.length = Buffer.byteLength(body)
		}
		return res.end(body)
	}

	// responses
	if (Buffer.isBuffer(body)) return res.end(body)
	if ('string' === typeof body) return res.end(body)
	if (body instanceof Stream) return body.pipe(res)

	// body: json
	body = JSON.stringify(body)
	if (!res.headersSent) {
		ctx.length = Buffer.byteLength(body)
	}
	res.end(body)
}

module.exports.HttpError = HttpError
