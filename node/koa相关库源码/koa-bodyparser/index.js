var parse = require('co-body')
var copy = require('copy-to')

module.exports = function (opts) {
	opts = opts || {}
	var detectJSON = opts.detectJSON
	var onerror = opts.onerror

	var enableTypes = opts.enableTypes || ['json', 'form']
	var enableForm = checkEnable(enableTypes, 'form')
	var enableJson = checkEnable(enableTypes, 'json')
	var enableText = checkEnable(enableTypes, 'text')
	var enableXml = checkEnable(enableTypes, 'xml')

	opts.detectJSON = undefined
	opts.onerror = undefined

	// force co-body return raw body
	opts.returnRawBody = true

	// default json types
	var jsonTypes = [
		'application/json',
		'application/json-patch+json',
		'application/vnd.api+json',
		'application/csp-report'
	]

	// default form types
	var formTypes = ['application/x-www-form-urlencoded']

	// default text types
	var textTypes = ['text/plain']

	// default xml types
	var xmlTypes = ['text/xml', 'application/xml']

	var jsonOpts = formatOptions(opts, 'json')
	var formOpts = formatOptions(opts, 'form')
	var textOpts = formatOptions(opts, 'text')
	var xmlOpts = formatOptions(opts, 'xml')

	var extendTypes = opts.extendTypes || {}

	extendType(jsonTypes, extendTypes.json)
	extendType(formTypes, extendTypes.form)
	extendType(textTypes, extendTypes.text)
	extendType(xmlTypes, extendTypes.xml)

	return async function bodyParser(ctx, next) {
		if (ctx.request.body !== undefined) return await next()
		if (ctx.disableBodyParser) return await next()
		try {
			const res = await parseBody(ctx)
			ctx.request.body = 'parsed' in res ? res.parsed : {}
			if (ctx.request.rawBody === undefined) ctx.request.rawBody = res.raw
		} catch (err) {
			if (onerror) {
				onerror(err, ctx)
			} else {
				throw err
			}
		}
		await next()
	}

	async function parseBody(ctx) {
		if (enableJson && ((detectJSON && detectJSON(ctx)) || ctx.request.is(jsonTypes))) {
			return await parse.json(ctx, jsonOpts)
		}
		if (enableForm && ctx.request.is(formTypes)) {
			return await parse.form(ctx, formOpts)
		}
		if (enableText && ctx.request.is(textTypes)) {
			return (await parse.text(ctx, textOpts)) || ''
		}
		if (enableXml && ctx.request.is(xmlTypes)) {
			return (await parse.text(ctx, xmlOpts)) || ''
		}
		return {}
	}
}

function formatOptions(opts, type) {
	var res = {}
	copy(opts).to(res)
	res.limit = opts[type + 'Limit']
	return res
}

function extendType(original, extend) {
	if (extend) {
		if (!Array.isArray(extend)) {
			extend = [extend]
		}
		extend.forEach(function (extend) {
			original.push(extend)
		})
	}
}

function checkEnable(types, type) {
	return types.includes(type)
}
