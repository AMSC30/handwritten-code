Function.prototype.myApply = function (context) {
  if (!context || Object.prototype.toString.call(context) !== '[object Object]') {
    context = window
  }
  const args = arguments.length > 1 ? arguments[1] : []
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}
