Function.prototype.myBind = function (context, ...args) {
  if (Object.prototype.toString.call(context) !== '[object Object]') {
    context = window
  }
  const fn = this
  return function Fn() {
    const argList = [...args, ...arguments]
    // new 调用
    if (this instanceof Fn) {
      return new fn(...argList)
    }
    return fn.apply(context, argList)
  }
}
